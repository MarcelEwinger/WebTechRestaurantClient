
import { OrderedItems } from './../model/ordereditems';
import { Order } from './../model/order';
import { ActivatedRoute } from '@angular/router';
import { Payment } from './../model/payment';
import { Review } from './../model/review';
import { HttpClient, HttpErrorResponse, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

const baseURL = "http://localhost:3000";


@Injectable({
  providedIn: 'root'
})
export class DbService {
  jwtToken:string = '';
  orderId: number = 0;
  orderStatusToken:number = 0;

  order: Order[] = [];
  orderStatus: boolean = false;
  orderStarted: boolean = false;

/**
 * 
 * @param http Definiert HTTP-Client-Objekt, um Anfrage an den Server zu schicken.
 * @param snackBar Definiert SnackBar-Objekt, um auf SnackBar Funktionen zuzugreifen.
 */
constructor(private http: HttpClient, private snackBar: MatSnackBar) { 

}

/**
 * 
 * @returns Gibt die alle Reviews über den Server zurück.
 */
 getReviews(): Observable<any> {
  return this.http.get(baseURL + "/:table/dashboard/reviews");
 }

 /**
  * 
  * @returns Gibt alle Kategorien über den Server zurück.
  */
 getCategories(): Observable<any> {
   return this.http.get(baseURL + "/categories");

 }

 /**
  * 
  * @param review Schickt das neue Review an den Server (und speichert es in der DB).
  */
 newReview(review: Review){
   const body = JSON.stringify(review);
   this.http.post(baseURL + "/:table/dashboard/reviews", review) .subscribe(
    (val) => {
        
                    this.snackBar.open('Review added', '', {
                      duration: 3000
                    });
    },
    response => {
        console.log("POST call in error", response);
    },
    () => {
        console.log("The POST observable is now completed.");
    });
 }

 /**
  * 
  * @param payment Payment-Objekt
  * @param tableNumber Tischnummer
  * @returns Schickt einen Payment-Request an den Server und gibt den Rückgabewert zurück.
  */
 askPayment(payment: Payment, tableNumber: Number): any{
  const body = JSON.stringify(payment);
   return this.http.post(baseURL + "/" + tableNumber+"/dashboard/payment", payment);
    
 }

 /**
  * 
  * @param id ID des Prdukts, welches geliked werden soll.
  * Schikt den Like an den Server und erhöht die Likes in der DB (anhand der Product ID).
  */
 setLikesInDB(id: number){
  this.http.put(baseURL + "/menuItem/like/" + id, "").subscribe(
    (val) => {
        console.log("Like Update successful", 
                    val);        
    },
    response => {
        console.log("Like Update error", response);
    },
    );
}

/**
  * 
  * @param id ID des Prdukts, welches geliked werden soll.
  * Schikt den Dislike an den Server und erhöht die Dislikes in der DB (anhand der Product ID).
  */
setDislikesInDB(id: number){
  this.http.put(baseURL + "/menuItem/dislike/" + id, "").subscribe(
    (val) => {
        console.log("Dislike Update successful", 
                    val);        
    },
    response => {
        console.log("Dislike Update error", response);
    },
    );
}

/**
 * 
 * @param table Tischnummer
 * @returns Gibt die ID der Waiter-Consultation vom Server zurück.
 */
getCallID(table: number): Observable<any>{
  return this.http.get<number>(baseURL + "/" + table + "/getCallID");
}

/**
 * 
 * @param table Tischnummer
 * @param callId Waiter-Consultation ID
 * @returns Gibt den Status der Consultation aus der DB über den Server zurück.
 */
getStatus(table: number, callId: number): Observable<any>{
  return this.http.get<String>(baseURL + "/" + table + "/getCallStatus/" + callId);
}
checkJWT(jwt: string, tableNumber: Number): Observable<any>{
  const url = baseURL +  "/" + tableNumber+"/dashboard/payment/jwt";
  const headers = new HttpHeaders().set('content-type', "application/json").set('authorization', 'Bearer ' + jwt);
  return this.http.post<any>(url, JSON.stringify({accessToken: jwt}), {headers: headers})

}

/**
 * 
 * @param token Stetzt den jwtToken.
 */
setJWTToken(token: string){
  this.jwtToken = token;
}

/**
 * 
 * @returns Gibt den jwtToken zurück.
 */
getJWTToken(): string{
  return this.jwtToken;
}

/**
 * 
 * Erstellt eine neue Order.
 */
processInsertedItems(data: any){
  this.orderStarted = true;
  let order = data.sendData1;
  let orderedItems = data.sendData2;
  let orderedItemsObj: OrderedItems[] = [];

  for(let oi of orderedItems){
    orderedItemsObj.push(oi);
  }

  let tableid = 0;
  let status = '';
  let totalamount = '';

  for(let i of order){
    tableid = i.tableid;
    status = i.status;
    totalamount = i.totalamount;
    if(i.status === 'closed'){
      this.orderStatus = true;
    }
  }
  if(this.order.length === 0){
    this.order.push(new Order(tableid, status, totalamount, orderedItemsObj));
  }else{
   let newOrder: Order[] = [];
   newOrder.push(new Order(tableid, status, totalamount, orderedItemsObj));
   this.order = [];
   this.order = newOrder;
  
  }
}

/**
 * 
 * @returns Gibt die Bestellung zurück.
 */
getOrder(){
  return this.order;
}

}
