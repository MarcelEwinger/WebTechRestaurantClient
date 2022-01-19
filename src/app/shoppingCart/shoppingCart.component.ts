import { ProductListService } from './../shared/product-list.service';
import { ShoppingCart } from './../model/shoppingCart';
import { Product } from './../model/product';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


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



  constructor(private productListService :ProductListService ) {
    this.subscription = this.productListService.getProduct().subscribe(Product =>{
      this.product = Product
      this.addProduct(this.product);

    });
   }



  ngOnInit() {
  
   
    
  }

  incrementProduct(shoppingCart : ShoppingCart){
    shoppingCart.quantity++;
    console.log(this.shoppingCart)
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
  }
  addProduct(product : Product){
    let status:boolean = false
    //if list is empty
    if(this.shoppingCart.length === 0){
       //console.log("List empty")
       this.shoppingCart.push(new ShoppingCart(product.itemid, product.title, 1, product.price))
       //console.log(this.shoppingCart)

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
      }
     
    }
  
    }
  

  loadShoppingCart(){
    return this.shoppingCart
  }

  

}
