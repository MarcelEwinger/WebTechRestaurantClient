import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const baseURL = "http://localhost:3000";
var callId: number = -1;

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss']
})
export class WaiterComponent implements OnInit {

  called: boolean = false;
  table: number = 0;
  status: String = "";
  href: String = "";

  constructor(private http: HttpClient, private router: Router) { 
    this.href = this.router.url;
    console.log(this.router.url);

    let works: String[] = this.href.split('/');
    console.log(works[1]);
    this.table = Number(works[1]);
  }

  ngOnInit(){

    console.log(callId);

    if(callId != -1){

    this.getStatus().subscribe((status: any) => {
      this.status = status[Object.keys(status)[0]];
      console.log(this.status);
      console.log(callId);
    
    if(this.status == "waiting"){
      this.called = true;

    }else{
      this.called = false;
      callId = -1;
    }});
    
  }
  console.log(this.called);
}

  callWaiter(){
    this.called = true;
    this.http.post(baseURL + "/" + this.table + "/callWaiter", "") .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("Error in Post", response);
      },
      () => {
          console.log("The POST is now completed.");

      this.getCallID().subscribe((data: any) => {
      callId = parseInt(data[Object.keys(data)[0]], 10);
      console.log(callId);
    });
      });
  }

  getStatus(): Observable<any>{
    return this.http.get<String>(baseURL + "/" + this.table + "/getCallStatus/" + callId);
  }

  getCallID(): Observable<any>{
    return this.http.get<number>(baseURL + "/" + this.table + "/getCallID");
  }
}
