
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

 
  
constructor(private http: HttpClient, private route: ActivatedRoute, private snackBar: MatSnackBar) { 

}
 getReviews(): Observable<any> {
  return this.http.get(baseURL + "/:table/dashboard/reviews");
 }

 getCategories(): Observable<any> {
   return this.http.get(baseURL + "/categories");

 }

 

 newReview(review: Review){
   const body = JSON.stringify(review);
   console.log(body);
   this.http.post(baseURL + "/:table/dashboard/reviews", review) .subscribe(
    (val) => {
        console.log("POST call successful value returned in body", 
                    val);
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

 askPayment(payment: Payment, tableNumber: Number): any{
  console.log(payment);
  const body = JSON.stringify(payment);
   console.log(body)
   return this.http.post(baseURL + "/" + tableNumber+"/dashboard/payment", payment);
    
 }

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

getCallID(table: number): Observable<any>{
  return this.http.get<number>(baseURL + "/" + table + "/getCallID");
}

getStatus(table: number, callId: number): Observable<any>{
  return this.http.get<String>(baseURL + "/" + table + "/getCallStatus/" + callId);
}
checkJWT(jwt: string, tableNumber: Number): Observable<any>{
  const url = baseURL +  "/" + tableNumber+"/dashboard/payment/jwt";
  const headers = new HttpHeaders().set('content-type', "application/json").set('authorization', 'Bearer ' + jwt);
  return this.http.post<any>(url, JSON.stringify({accessToken: jwt}), {headers: headers})

}


setJWTToken(token: string){
  this.jwtToken = token;
  //console.log(this.jwtToken);
}

getJWTToken(): string{
  return this.jwtToken;
}

processInsertedItems(data: any){
  console.log(data);
  let order = data.sendData1;
  let orderedItems = data.sendData2;
  //console.log(order);
  //console.log(orderedItems)
 
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
      console.log("Status closed")

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

getOrder(){
  return this.order;
}


}
