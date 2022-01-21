import { ShoppingCart } from './../model/shoppingCart';


import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';




@Injectable({providedIn: 'root'})

export class LocalStorageService {
  

  constructor() {
   
  }

  
setInfo(data: any){
  const jsonData = JSON.stringify(data);
  localStorage.setItem('data', jsonData);
  console.log("Save Data" + jsonData ); 
}

getData(){
  console.log("Load Data"); 
  return localStorage.getItem('data');
}

removeData(key: string){
  localStorage.removeItem(key);
}


  
}


