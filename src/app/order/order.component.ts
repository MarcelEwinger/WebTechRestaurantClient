import { Component, OnInit } from '@angular/core';
import { DbService } from '../shared/db.service';

var placedOrder: boolean = false;

const baseURL = "http://localhost:3000";

var table = 1;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {

  showOrder: boolean = true;
  status: String = "";
  orderID: number = 0;
  table: number;
  likes: number;
  dislikes: number;
  title: String;
  productStatus: String;
  
  constructor(private dbService: DbService) {
    this.orderID = 0;
    this.table = table;
    this.status = "We are working on it!";
    this.likes = 5;
    this.dislikes = 1;
    this.title = "Test";
    this.productStatus = "Keine Ahnung";

  }

  ngOnInit() {
    if(placedOrder == true){
      this.showOrder = true;
    }
  
  }

  getOrder(){
    this.dbService.getOrder(this.orderID).subscribe((Order: any) => {
      
    });
  }

}
