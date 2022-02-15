import { SessionStorageService } from './../shared/sessionStorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  jwtToken:string = '';

  paymentRefFalse:string = "00sd0sd";
  paymentRefTrue:string = "jsnuebgfglwh3u";
  tableNumber:number = 0;

  
 
/**
 * 
 * @param productListService 
 * @param dialog 
 * @param localStorageServie 
 * @param dbService 
 * @param route 
 * @param router 
 * @param snackBar 
 * @param sessionStorage 
 * 
 * Definiert benötigte externe Komponenten und Objekten
 */
  constructor(private productListService :ProductListService, public dialog: MatDialog, private localStorageServie: LocalStorageService, private dbService: DbService, private route: ActivatedRoute,
     private router: Router, private snackBar: MatSnackBar, private sessionStorage: SessionStorageService) { }

     /**
      * Lädt den LocalStorage (falls vorthanden) und speichert die Tischnummer.
      */
  ngOnInit() {
    this.getTabelNumber();


    if(this.localStorageServie.getData() != null){
      var temp = this.localStorageServie.getData();
      if(temp !=null)
      var obj = JSON.parse(temp);
      this.shoppingCart = obj;
      this.loadSum();
    }
  }
  
  /**
   * Berechnet den Gesamtpreis des Warenkorbs.
   */
  loadSum(){
    this.shoppingCart.forEach((element, index)=>{
      if(element.price != null)
      this.totalSum = this.totalSum + (element.price  * element.quantity);
     });
  
}

/**
 * 
 * @returns Gibt den Gesamtpreis zurück.
 */
getTotalSum(){
  return this.totalSum.toFixed(2);
}

/**
 * 
 * @returns Gibt den Warenkorb zurück.
 */
loadShoppingCart(){
    return this.shoppingCart;
}

/**
 * Prüft, ob der Warenkorb befüllt ist.
 * Erstellt eine neues Payment-Objekt anhand der Daten aus dem Warenkorb.
 */
errorInPayment(){
  if(this.shoppingCart.length === 0){
    this.displaySnackbar('No Items in Order', 3000);
  }
    else{
      this.orderShoppingCart = this.shoppingCart;
      this.orderTotalSum = this.totalSum;
      let returnValue =  this.dbService.askPayment(new Payment(this.orderTotalSum, this.orderShoppingCart,  this.paymentRefFalse), this.tableNumber);
      this.paymentProcessing(returnValue);
   
    }
 
}

/**
 * Führt die Bezahlung der Bestellung durch, wenn der Warenkorb nicht leer ist.
 */
executePayment(){
  if(this.shoppingCart.length === 0){
    this.displaySnackbar('No Items in Order', 3000);
  }else{
    this.orderShoppingCart = this.shoppingCart;
    this.orderTotalSum = this.totalSum;
    let returnValue =  this.dbService.askPayment(new Payment(this.orderTotalSum, this.orderShoppingCart, this.paymentRefTrue), this.tableNumber);  
    this.paymentProcessing(returnValue);
    this.getOrderedProducts();
  }
}


checkBevorPay(){
  let executePaymentSnackbar = this.snackBar.open('Do you really want to order?', 'Undo');
  executePaymentSnackbar.afterDismissed().subscribe(() => {
  });
  
  executePaymentSnackbar.onAction().subscribe(() => {
  });
  
  executePaymentSnackbar.dismiss()
}

/**
 * Fragt die Bestellten Produkte über den Server (Datenbank), über einen jwtToken ab.
 */
getOrderedProducts(){
  this.dbService.orderStarted = true;
    setInterval (() =>{
      if(this.dbService.orderStatus === false){
        let data = this.dbService.checkJWT(sessionStorage.getItem('jwt')!,this.tableNumber );
        data.subscribe(
          (val: any) => {
                          this.dbService.processInsertedItems(val);
      
          },
          (    response: any) => {
              this.displaySnackbar('JWT failure' , 3000);
          },
          () => {
          });
      }
     
    }, 10000)
}

/**
 * 
 * @param data 
 * 
 * Prüft, ob die Bezahlung erfolfreich war.
 * Speichert den jwtToken über den Server in die Datenbank.
 * Gibt aus, ob die Bezahlung erfolgreich war oder gescheitert ist.
 */
paymentProcessing(data: any){
  data.subscribe(
    (val: any) => {
                    if(val != ''){
                      this.dbService.setJWTToken(val);
                      this.displaySnackbar('Payment successful' , 3000);
                      sessionStorage.setItem('jwt', this.dbService.getJWTToken());
                      
                    }else{
                      this.displaySnackbar('Payment failure' , 3000);
                    }   
    },
    (    response: any) => {
        this.displaySnackbar('Payment failure' , 3000);
    },
    () => {
        console.log("The POST observable is now completed.");
    });
}


/**
 * 
 * @param text Text, welcher angezeigt werden soll.
 * @param length Länge als Number
 */
displaySnackbar(text: string, length: number){
  this.snackBar.open(text, '', {
    duration: length
  });
}

/**
 * Liest die Tischnummer aus der URl aus.
 */
getTabelNumber(){
  let href = this.router.url;
  const works = href.split('/');
  this.tableNumber = Number(works[1]);
  }
}
