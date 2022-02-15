import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})

export class LocalStorageService {
  

  constructor() {
   
  }

  
setInfo(data: any){
  const jsonData = JSON.stringify(data);
  localStorage.setItem('data', jsonData);
}

getData(){
  return localStorage.getItem('data');
}

removeData(key: string){
  localStorage.removeItem(key);
}

clearData(){
  localStorage.clear();
}


  
}



