import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  orderID: number = 0;
  
  constructor(private http: HttpClient) {
    this.orderID = 0;
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

  getStatus(): Observable<any>{
    return this.http.get<String>(baseURL + "/" + table + "/getOrderStatus/" + this.orderID);
  }

}
