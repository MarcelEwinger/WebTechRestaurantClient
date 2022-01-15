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
    this.subscription = this.productListService.getNumber().subscribe(Product =>{
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
    console.log("Test " + shoppingCart.quantity)
    if(shoppingCart.quantity === 1){
      this.shoppingCart.forEach((element, index)=>{
        if(element.itemid === shoppingCart.itemid) 
        delete this.shoppingCart[index]
      });
      

    }else{
      shoppingCart.quantity--;
      console.log(this.shoppingCart)
    }

  }

  addProduct(product : Product){
    if(this.shoppingCart.length == 0){
      //console.log("List empty")
      this.shoppingCart.unshift(new ShoppingCart(product.itemid, product.title, 1, product.price))
      console.log(this.shoppingCart)
    }else{
      //console.log("List is not empty");
      for(let s of this.shoppingCart){

        if(s.itemid === product.itemid){
          s.quantity++;
          console.log(this.shoppingCart)
          break;

        }if(s.itemid != product.itemid){
          this.shoppingCart.unshift(new ShoppingCart(product.itemid, product.title, 1, product.price))
          console.log(this.shoppingCart)
          break;

        }

      }
    }

  }

  

}
