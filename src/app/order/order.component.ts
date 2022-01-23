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

  showOrder: boolean = true;
  status: String = "";
  id: number = 0;
  table: number;
  likes: number;
  dislikes: number;
  title: String;
  productStatus: String;
  
  constructor(private http: HttpClient) {
    this.id = 0;
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

  getOrderStatus(): String{

    return "";
  }

 /* getStatus(): Observable<any>{
    return this.http.get<String>(baseURL + "/getOrderStatus/" + this.orderID);
  }*/

}
