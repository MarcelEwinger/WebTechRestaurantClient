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

  /**
   * 
   * @param dbService Definiert DBService, um auf die Methoden der Klasse zugreifen zu können.
   * @param sessionStorage Definiert SessionStorage, um auf die Methoden der Klasse zugreifen zu können.
   * @param snackBar Definiert MatSnackBar, um auf die Methoden der Klasse zugreifen zu können.
   * 
   * Fragt die Bestellung ab und prüft, ob das Payment schon durchgeführt wurde.
   */
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

  /**
   * 
   * @returns Gibt die Bestellung über DBService zurück.
   */
  getOrder(){
    this.order = this.dbService.getOrder();
    return this.order;
  }

  /**
   * 
   * @param text Übergabeparamter: String
   * @param length Übergabeparameter: Number
   * 
   * Öffnet die MatSnackBar
   */
  displaySnackbar(text: string, length: number){
    this.snackBar.open(text, '', {
      duration: length
    });
  }

}
