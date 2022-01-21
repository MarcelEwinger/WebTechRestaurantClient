import { Review } from './../model/review';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';

const baseURL = "http://localhost:3000";


@Injectable({
  providedIn: 'root'
})
export class DbService {

constructor(private http: HttpClient) { 

}

getReviews(): Observable<any> {
  return this.http.get(baseURL + "/reviews");
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

}