import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

constructor() {

 }

 setItem(key: string, value: string){
  sessionStorage.setItem(key, value);
  console.log('Item was set');

 }

 getItem(key: string){
   return sessionStorage.getItem(key);

 }

 removeItem(key:string){
   sessionStorage.removeItem(key);
   console.log('Item was removed');

 }

 clearStorage(){
  sessionStorage.clear();
  console.log('Session was cleared');
 }

}
