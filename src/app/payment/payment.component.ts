import { ActivatedRoute, Router } from '@angular/router';
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

  jwtToken:any;

  paymentRef:string = "jsnuebgfglwh3u";

  //public href: string = "";

  tableNumber:number = 0;
 

  constructor(private productListService :ProductListService, public dialog: MatDialog, private localStorageServie: LocalStorageService, private dbService: DbService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
   let href = this.router.url;
    const works = href.split('/');
    console.log(works[1]);
    this.tableNumber = Number(works[1]);
   

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
  
  loadSum(){
    this.shoppingCart.forEach((element, index)=>{
      if(element.price != null)
      this.totalSum = this.totalSum + (element.price  * element.quantity);
     });
  
 
}
loadShoppingCart(){
    return this.shoppingCart;
}
/*
executePayment(){
  if(this.dbService.getJWTToken() != null){
    this.jwtToken = this.dbService.getJWTToken();
    console.log(this.jwtToken);

  }
  const message ="Payment Successful <br> Order submitted <br> Please switch to Order or press the Button to see your Order Progress";
  (<HTMLInputElement>document.getElementById("payment")).innerHTML = message;
}
*/
errorInPayment(){
  this.orderShoppingCart = this.shoppingCart;
  this.orderTotalSum = this.totalSum;
  this.dbService.askPayment(new Payment(this.orderTotalSum, this.orderShoppingCart, "00sd0sd"), this.tableNumber);
  setTimeout(() =>{
    if(this.dbService.getJWTToken() != null){
      this.jwtToken = this.dbService.getJWTToken();
      (<HTMLInputElement>document.getElementById("payment")).innerHTML = "Error In Payment";
    }
  }, 200);

  
}
executePayment(){
  this.orderShoppingCart = this.shoppingCart;
  this.orderTotalSum = this.totalSum;
  this.dbService.askPayment(new Payment(this.orderTotalSum, this.orderShoppingCart, this.paymentRef), this.tableNumber);

  setTimeout(() =>{
    if(this.dbService.getJWTToken() != null){
      this.jwtToken = this.dbService.getJWTToken();
      const message ="Payment Successful <br> Order submitted <br> Please switch to Order or press the Button to see your Order Progress";
      (<HTMLInputElement>document.getElementById("payment")).innerHTML = message;
    }
  }, 200);
  
}



}
