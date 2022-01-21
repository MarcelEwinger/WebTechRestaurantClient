import { LocalStorageService } from './../shared/localStorage.service';
import { ProductListService } from './../shared/product-list.service';
import { ShoppingCart } from './../model/shoppingCart';
import { Product } from './../model/product';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


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
  





  constructor(private productListService :ProductListService, public dialog: MatDialog, private localStorageServie: LocalStorageService ) {
    this.subscription = this.productListService.getProduct().subscribe(Product =>{
      this.product = Product
      this.addProduct(this.product);

    });
   }



  ngOnInit() {
    if(this.localStorageServie.getData() != null){
      var temp = this.localStorageServie.getData();
      if(temp !=null)
      var obj = JSON.parse(temp);
      console.log(obj);
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

    
    
    
  

  incrementProduct(shoppingCart : ShoppingCart){
    shoppingCart.quantity++;
    console.log(this.shoppingCart);
    console.log(shoppingCart.price);
    this.countSum(Number(shoppingCart.price));

    this.localStorageServie.setInfo(this.shoppingCart);
    console.log(this.shoppingCart);

  }
  
  decrementProduct(shoppingCart : ShoppingCart){
    this.shoppingCart.forEach((element, index)=>{
     if(element.itemid === shoppingCart.itemid){
       if(shoppingCart.quantity > 1){
        shoppingCart.quantity--;
        console.log(this.shoppingCart)
       }else{
         this.shoppingCart.splice(index, 1);
         this.loadShoppingCart;
         console.log(this.shoppingCart)
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
       //console.log("List empty")
       this.shoppingCart.push(new ShoppingCart(product.itemid, product.title, 1, product.price))
       //console.log(this.shoppingCart)
       this.countSum(Number(product.price));

       this.localStorageServie.setInfo(this.shoppingCart);
       console.log(this.shoppingCart)
       

    }else{
      this.shoppingCart.forEach((element, index)=>{
        if(element.itemid === product.itemid){
          this.incrementProduct(element);
          status = true;
         
        }
      }); 
      
      
      if(status === false){
        this.shoppingCart.push(new ShoppingCart(product.itemid, product.title, 1, product.price))
         //console.log(this.shoppingCart)
         this.countSum(Number(product.price));

         this.localStorageServie.setInfo(this.shoppingCart);
         
      }
    }
    }
  

  loadShoppingCart(){
    return this.shoppingCart;
  }

  pay(){
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


  

}
