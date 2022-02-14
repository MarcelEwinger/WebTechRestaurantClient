
import { OrderedItems } from './../model/ordereditems';
import { Order } from './../model/order';
import { ActivatedRoute } from '@angular/router';
import { Payment } from './../model/payment';
import { Review } from './../model/review';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
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
  
  
  

constructor(private http: HttpClient, private route: ActivatedRoute, private snackBar: MatSnackBar) { 

}






 getOrder(id:number):Observable<any>{
   return this.http.get(baseURL + "/1/getOrder/"+id);
  }
  getOrderedItems(id:number):Observable<any>{
    return this.http.get(baseURL + "/1/getOrderedItems/"+id);
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

setJWTToken(token: string){
  this.jwtToken = token;
  //console.log(this.jwtToken);

}

getJWTToken(): string{
  return this.jwtToken;
}

}
