import { MatSnackBar } from '@angular/material/snack-bar';
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

  
  constructor(private dbService: DbService, private sessionStorage: SessionStorageService, private snackBar: MatSnackBar) {
    this.getOrder();
    if(this.dbService.orderStarted === false){
      this.displaySnackbar("Payment was not executed", 3000);

    }else{
      this.getOrder();
    }
   
 
  }

  ngOnInit() {
   
  }

  getOrder(){
    this.order = this.dbService.getOrder();
    return this.order;
  }
  displaySnackbar(text: string, length: number){
    this.snackBar.open(text, '', {
      duration: length
    });
  }

}
