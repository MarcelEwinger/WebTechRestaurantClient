import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})

export class LocalStorageService {
  

  constructor() {
   
  }

  /**
   * 
   * @param data Speichert den übergebenen Wert (data) in den LocalStorage.
   */
setInfo(data: any){
  const jsonData = JSON.stringify(data);
  localStorage.setItem('data', jsonData);
}

/**
 * 
 * @returns Gibt den Inhalt des LocalStorage zurück.
 */
getData(){
  return localStorage.getItem('data');
}

/**
 * 
 * @param key Löscht den Inhalt des LocalStorage am übergebenen Index.
 */
removeData(key: string){
  localStorage.removeItem(key);
}

/**
 * Löscht den gesamten LocalStorage.
 */
clearData(){
  localStorage.clear();
}

}



