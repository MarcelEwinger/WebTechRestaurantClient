import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/localStorage.service';

const baseURL = "http://localhost:3000";

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss']
})
export class WaiterComponent implements OnInit {

  called: boolean = false;

  constructor(private localStorageServie: LocalStorageService ,private http: HttpClient) { 
  }

  ngOnInit() {
    if(this.localStorageServie.getData != null){
      var temp = this.localStorageServie.getData();
      if(temp != null){
        if(temp.match('true')){
          this.called = true;
        }else{
        this.called = false;
      }
    }  
  }
}

  callWaiter(){
    this.called = true;
    this.localStorageServie.setInfo(this.called);
    let body: number = 1;
    this.http.post(baseURL + "1" + "/callWaiter", body);
  }

}
