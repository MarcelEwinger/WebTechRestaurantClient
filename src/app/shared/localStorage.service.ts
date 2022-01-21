import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  

constructor() { 

}

setData(data: any){
  const jsonData = JSON.stringify(data);
  localStorage.setItem('data', jsonData);
  console.log("Save Data"); 
}

getData(){
  console.log("Load Data"); 
  return localStorage.getItem('data');
}

removeData(key: string){
  localStorage.removeItem(key);


}

}
