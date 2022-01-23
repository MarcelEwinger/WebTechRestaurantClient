import { OrderedItems } from './../model/ordereditems';
import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { DbService } from '../shared/db.service';

var placedOrder: boolean = false;

var table = 1;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
  panelOpenState = false;
  mySentences:Array<Object> = [
    {id: 1, text: 'Sentence 1'},
    {id: 2, text: 'Sentence 2'},
    {id: 3, text: 'Sentence 3'},
    {id: 4, text: 'Sentenc4 '},

    
];
  orders: Order[] = [];
  orderedItems: OrderedItems[] = [];
/*
  showOrder: boolean = true;
  status: String = "";
  orderID: number = 0;
  table: number;
  likes: number;
  dislikes: number;
  title: String;
  productStatus: String;
  */
  
  constructor(private dbService: DbService) {
    /*
    this.orderID = dbService.orderId;
    this.table = table;
    this.status = "We are working on it!";
    this.likes = 5;
    this.dislikes = 1;
    this.title = "Test";
    this.productStatus = "Keine Ahnung";
    */
  }

  ngOnInit() {
    /*
    if(placedOrder == true){
      this.showOrder = true;
    }
    */
  
  }
 

  getOrder(){
    this.dbService.getOrder(this.dbService.orderId).subscribe((Order: Order[]) => {
      //console.log(Order);
      this.orders = Order;
      console.log(this.orders);
    });
    this.dbService.getOrderedItems(this.dbService.orderId).subscribe((OrderedItems: OrderedItems[]) => {
      //console.log(Order);
      this.orderedItems = OrderedItems;
      console.log(this.orderedItems);
    });

    



    
  }

  getOrderedProducts(){
    
  }

  loadOrder(){
    return this.orders;
  }

  loadOrderedItems(){
    return this.orderedItems;

  }

}
