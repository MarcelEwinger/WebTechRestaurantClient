import { SessionStorageService } from './../shared/sessionStorage.service';
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
  order: Order[] = [];

  
  constructor(private dbService: DbService, private sessionStorage: SessionStorageService) {
   this.getOrder();
 
  }

  ngOnInit() {
   
  }

  getOrder(){
    return this.dbService.getOrder();
  }

}
