import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

constructor() {

 }

 /**
  * 
  * @param key Index an dem der Wert gespeichert wird.
  * @param value Wert, welcher gespeichert werden soll.
  * 
  * Legt die übergebene Variable in den SessionStorage ab.
  */
 setItem(key: string, value: string){
  sessionStorage.setItem(key, value);

 }

 /**
  * 
  * @param key Index der Variable.
  * @returns Wert an der Stelle key.
  */
 getItem(key: string){
   return sessionStorage.getItem(key);

 }

 /**
  * 
  * @param key Löscht den Wert an dem Index key.
  */
 removeItem(key:string){
   sessionStorage.removeItem(key);

 }

 /**
  * Löscht den gesamten SessionStorage.
  */
 clearStorage(){
  sessionStorage.clear();
 }

}
