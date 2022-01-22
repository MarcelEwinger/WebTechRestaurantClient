import { DbService } from './../shared/db.service';
import { Payment } from './../model/payment';

import { LocalStorageService } from './../shared/localStorage.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductListService } from './../shared/product-list.service';
import { ShoppingCart } from './../model/shoppingCart';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  shoppingCart: ShoppingCart[] = [];
  totalSum: number = 0;
  orderShoppingCart: ShoppingCart[] = [];
  orderTotalSum: number = 0;

  payment: Payment[] = [];
 



  constructor(private productListService :ProductListService, public dialog: MatDialog, private localStorageServie: LocalStorageService, private dbService: DbService) { }

  ngOnInit() {
    if(this.localStorageServie.getData() != null){
      var temp = this.localStorageServie.getData();
      if(temp !=null)
      var obj = JSON.parse(temp);
      console.log(obj);
      this.shoppingCart = obj;
      console.log(this.shoppingCart);
      this.loadSum();
    }


  }
  pay(){
    this.orderShoppingCart = this.shoppingCart;
    this.orderTotalSum = this.totalSum;
    //console.log(this.payment);
    this.dbService.askPayment(new Payment(this.orderTotalSum, this.orderShoppingCart));

    console.log(this.dbService.jwtToken);


   
  }
  loadSum(){
    this.shoppingCart.forEach((element, index)=>{
      if(element.price != null)
      this.totalSum = this.totalSum + (element.price  * element.quantity);
     });
  
 
}
  loadShoppingCart(){
    return this.shoppingCart;
  }

}
