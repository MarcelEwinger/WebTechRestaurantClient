import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LocalStorageService } from './../shared/localStorage.service';
import { ProductListService } from './../shared/product-list.service';
import { ShoppingCart } from './../model/shoppingCart';
import { Product } from './../model/product';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ResizedEvent } from 'angular-resize-event';



@Component({
  selector: 'app-shoppingCart',
  templateUrl: './shoppingCart.component.html',
  styleUrls: ['./shoppingCart.component.css']
})
export class ShoppingCartComponent implements OnInit {


  @Input()
  products!: Product[];
  shoppingCart: ShoppingCart[] = []
  product: any;
  subscription: Subscription;
  totalSum: number = 0;

  url!: string;

  private width: number = window.innerWidth;

  public small: boolean = true;

  constructor(private productListService :ProductListService, public dialog: MatDialog, private localStorageServie: LocalStorageService, private observer: BreakpointObserver) {
    this.subscription = this.productListService.getProduct().subscribe(Product =>{
      this.product = Product
      this.addProduct(this.product);

      if(this.width < 800){
        this.small = true;
      }else{
        this.small = false;
      }

    });

  
   }



  ngOnInit() {

    if(this.localStorageServie.getData() != null){
      var temp = this.localStorageServie.getData();
      if(temp !=null)
      var obj = JSON.parse(temp);
      this.shoppingCart = obj;
      this.loadSum();
    }

    
    
   
     
    
    
    }

    loadSum(){
        this.shoppingCart.forEach((element, index)=>{
          if(element.price != null)
          this.totalSum = this.totalSum + (element.price  * element.quantity);
         });
      
    }

    getTotalSum(){
      return this.totalSum.toFixed(2);
    }

    
    
    
  

  incrementProduct(shoppingCart : ShoppingCart){
    shoppingCart.quantity++;
    this.countSum(Number(shoppingCart.price));

    this.localStorageServie.setInfo(this.shoppingCart);

  }
  
  decrementProduct(shoppingCart : ShoppingCart){
    this.shoppingCart.forEach((element, index)=>{
     if(element.itemid === shoppingCart.itemid){
       if(shoppingCart.quantity > 1){
        shoppingCart.quantity--;
       }else{
         this.shoppingCart.splice(index, 1);
         this.loadShoppingCart;
       }
     }
    });
    
    this.decreseSum(Number(shoppingCart.price));
    this.localStorageServie.setInfo(this.shoppingCart);
    
    
    
  }
  addProduct(product : Product){
    let status:boolean = false
    //if list is empty
    if(this.shoppingCart.length === 0){
       this.shoppingCart.push(new ShoppingCart(product.id, product.title, 1, product.price))
       this.countSum(Number(product.price));

       this.localStorageServie.setInfo(this.shoppingCart);
       

    }else{
      for(let i = 0; i < this.shoppingCart.length; i++){
        if(this.shoppingCart[i].itemid === product.id){
          this.incrementProduct(this.shoppingCart[i]);
          status = true;
        }
      }
      
      if(status === false){
        this.shoppingCart.push(new ShoppingCart(product.id, product.title, 1, product.price))
         this.countSum(Number(product.price));

         this.localStorageServie.setInfo(this.shoppingCart);
         
      }
    }
    }
  

  loadShoppingCart(){
    return this.shoppingCart;
  }

  pay(){
    console.log("Test")
  
  }

  countSum(price: number){
    if(price != null){
      this.totalSum = Number((this.totalSum +  price).toFixed(2));
    }  
  }

  decreseSum(price: number){
    if(price != null){
      this.totalSum = Number((this.totalSum -  price).toFixed(2));
    }  
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: ResizedEvent):void {
    this.width = window.innerWidth;
    if(this.width <= 800){
      this.small = true;
    }else{
      this.small = false;
    }
  }


}
