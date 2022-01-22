import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
//import { LocalStorageService } from '../shared/localStorage.service';

const baseURL = "http://localhost:3000";

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss']
})
export class WaiterComponent implements OnInit {

  called: boolean = false;
  date: Date = new Date();
  timestamp: String = "";
  table: number = 1;
  callId: number = -1;
  status: String = "";

  constructor(private http: HttpClient) { 
    
  }

  ngOnInit(){

    if(this.callId != -1){

    this.getStatus().subscribe((data: String) => this.status = data);
    if(this.status == 'waiting'){
      this.called = true;

    }else{
      this.called = false;
      this.timestamp = "";
      this.callId = -1;
    }
  }
}

  callWaiter(){
    this.called = true;
    this.timestamp = new Date().toISOString().slice(0, 10);
    console.log(this.timestamp);
    this.http.post(baseURL + "/" + this.table + "/callWaiter", this.timestamp) .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("Error in Post", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
    //this.getCallID().subscribe((data: number) => this.callId = data);
  }

  getStatus(): Observable<any>{
    return this.http.get<String>(baseURL + "/" + this.table + "/getCallStatus/" + this.callId);
  }

  getCallID(): Observable<any>{
    return this.http.get<number>(baseURL + "/" + this.table + "/getCallID");
  }
}
