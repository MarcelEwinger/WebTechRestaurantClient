import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

var placedOrder: boolean = false;

const baseURL = "http://localhost:3000";

var table = 1;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {

  showOrder: boolean = false;
  status: String = "";
  
  constructor() {
    this.status = this.getOrderStatus();

  }

  ngOnInit() {
    if(placedOrder == true){
      this.showOrder = true;
    }
  
  }

  getOrderStatus(): String{





    return "";
  }


}
