import { Observable, Observer } from 'rxjs';
import { OrderedItems } from './../model/ordereditems';
import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { DbService } from '../shared/db.service';

var placedOrder: boolean = false;



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
  panelOpenState = true;
  orders: Order[] = [];
  orderedItems: OrderedItems[] = [];
  
  constructor(private dbService: DbService) {
 
  }

  ngOnInit() {
    if(this.dbService.orderId === 0 || this.dbService.orderId === null){
      console.log("Payment was not executed");
      (<HTMLInputElement>document.getElementById("errorMessage")).innerHTML = "Payment was not executed";
    }else{
     if(this.dbService.orderStatusToken === 0){
      this.getOrderedProducts();
      this.dbService.orderStatusToken = 1;
     }else{
       console.log("Order Process already running")
     }
      
    }
  }

  
  getOrderedProducts(){
    setInterval(() =>{
      this.dbService.getOrder(this.dbService.orderId).subscribe((Order: Order[]) => {
        this.orders = Order;
        console.log(this.orders);
      });
      this.dbService.getOrderedItems(this.dbService.orderId).subscribe((OrderedItems: OrderedItems[]) => {
        this.orderedItems = OrderedItems;
        console.log(this.orderedItems);
      }); 
    }, 5000);
  }

  

  loadOrder(){
    return this.orders;
  }

  loadOrderedItems(){
    return this.orderedItems;

  }

}
