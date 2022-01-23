import { Payment } from './../model/payment';
import { Review } from './../model/review';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';

const baseURL = "http://localhost:3000";


@Injectable({
  providedIn: 'root'
})
export class DbService {
  jwtToken:any;
  orderId: number = 0;

constructor(private http: HttpClient) { 

}

getJWTToken(){
  return this.jwtToken;
}

getOrderId(){
  return this.orderId;
}

setOrderId(val: any){
}

getReviews(): Observable<any> {
  return this.http.get(baseURL + "/reviews");
 }

 getOrder(id:number){
   return this.http.get(baseURL + "/1/getOrder/" + id+"");
}

 newReview(review: Review){
  // console.log(review);
   const body = JSON.stringify(review);
   console.log(body)
   //const headers = { 'content-type': 'application/json'}  
   this.http.post(baseURL + "/reviews", review) .subscribe(
    (val) => {
        console.log("POST call successful value returned in body", 
                    val);
                    
    },
    response => {
        console.log("POST call in error", response);
    },
    () => {
        console.log("The POST observable is now completed.");
    });
 }


 askPayment(payment: Payment){
  console.log(payment);
   const body = JSON.stringify(payment);
   console.log(body)
   //const headers = { 'content-type': 'application/json'}  
   this.http.post(baseURL + "/payment", payment) .subscribe(
    (val) => {
        console.log("POST call successful value returned in body", 
                    val);
              if(Number(val) != null && Number(val > 0 )){
                this.orderId = Number(val);
                console.log(this.orderId);
              }
              else{
                console.log("Error"); 
               }
               
           
    },
    
    response => {
        console.log("POST call in error", response);
    },
    () => {
        console.log("The POST observable is now completed.");
    });

 }


 

 

}
