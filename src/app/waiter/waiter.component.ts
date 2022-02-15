import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../shared/db.service';

const baseURL = "http://localhost:3000";

var callId = -1;

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss']
})
export class WaiterComponent implements OnInit {

  public called: boolean = false;
  private table: number = 0;
  private status: String = "";
  private href: String = "";

  constructor(private http: HttpClient, private router: Router, private db: DbService) {
    this.href = this.router.url;

    let works: String[] = this.href.split('/');

    this.table = Number(works[1]);

  }

  ngOnInit() {



   var temp = window.localStorage.getItem("callId");


    if(temp != null){
      callId = parseInt(temp);
    }

    if (callId != -1) {

      this.db.getStatus(this.table, callId).subscribe((status: any) => {
        this.status = status[Object.keys(status)[0]];


        if (this.status == "waiting") {
          this.called = true;

        } else {
          this.called = false;
          callId = -1;
          window.localStorage.removeItem("callId");
        }
      },
        response => {
          console.log("ID not found or consultation already done");
        }
      );

    }else{
      window.localStorage.removeItem("callId");
    }
  }

  callWaiter() {
    this.called = true;
    this.http.post(baseURL + "/" + this.table + "/callWaiter", "").subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        console.log("Error in Post", response);
      },
      () => {
        console.log("The POST is now completed.");

        this.db.getCallID(this.table).subscribe((data: any) => {
          callId = parseInt(data[Object.keys(data)[0]], 10);
          window.localStorage.setItem("callId", callId.toString());
        });
      });
  }



}
