import { OrderedItems } from './../model/ordereditems';
import { Order } from './../model/order';
import { ActivatedRoute } from '@angular/router';
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
  orderStatusToken:number = 0;
  
  
  

constructor(private http: HttpClient, private route: ActivatedRoute) { 

}

getJWTToken(){
  return this.jwtToken;
}





 getOrder(id:number):Observable<any>{
   return this.http.get(baseURL + "/1/getOrder/"+id);
  }
  getOrderedItems(id:number):Observable<any>{
    return this.http.get(baseURL + "/1/getOrderedItems/"+id);
 }


<<<<<<< HEAD


=======
>>>>>>> 15fe012befe5be49726eeb1e064fdf1b208413c3
 getReviews(): Observable<any> {
  return this.http.get(baseURL + "/:table/dashboard/reviews");
 }
 newReview(review: Review){
   const body = JSON.stringify(review);
   console.log(body);
   this.http.post(baseURL + "/:table/dashboard/reviews", review) .subscribe(
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


 askPayment(payment: Payment, tableNumber: Number){
  console.log(payment);
   const body = JSON.stringify(payment);
   console.log(body)
   this.http.post(baseURL + "/" + tableNumber+"/dashboard/payment", payment) .subscribe(
    (val) => {
        console.log("POST call successful value returned in body", 
                    val);
              if(Number(val) != null && Number(val > 0 )){
                this.orderId = Number(val);
                console.log(this.orderId);
              }
              else{
                this.orderId = 0;
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

<<<<<<< HEAD


=======
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
>>>>>>> 15fe012befe5be49726eeb1e064fdf1b208413c3

}
