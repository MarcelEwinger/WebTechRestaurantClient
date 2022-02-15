import { Category } from './../model/category';
import { ShoppingCart } from './../model/shoppingCart';
import { Product } from './../model/product';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const baseURL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  private productList!: Product[];
  private shoppingCart: ShoppingCart[] = []

  private subject = new Subject<any>();

  
/**
 * 
 * @param product Speichere Prduct in subject ab.
 */
  sendProduct(product: Product){
    this.subject.next(product);
  }

  /**
   * 
   * @returns Gibt das subject zurück.
   */
  getProduct():Observable<any>{
    return this.subject.asObservable();

  }
  
  /**
   * 
   * @param http HTTP-Client, um Anfragen an den Server zu schicken.
   */
  constructor(private http: HttpClient) { 
  }

 /**
  * 
  * @param word Filterkriterium
  * @param list ProductList
  * @returns Gibt die gefilterte Prouct-Liste anhand des Filterkriteriums zurück.
  */

  filterProductsByTitle(word : string, list: Product[]) : Product[]{
    if(word == ''){
      return list;
    }else{
      return list.filter((p) => p.title?.toLowerCase().includes(word.toLowerCase()));
    }
  }

  /**
   * 
   * @param category Kategorie, nach der gefiltert wird.
   * @param list PrdoctList
   * @returns Gibt die gefilterte Product-Liste anhand der Kategorie zurück.
   */
  filterProductsByCategory(category: Category, list: Product[]) : Product[]{
    return list.filter((p) => p.categories.includes(category.name));
  }

  /**
   * 
   * @param product Produkt, welches geliked wird.
   * @returns Nachricht, dass das Prdukt geliked wurde.
   */
  likeProduct(product : Product): string{
    return  "<p>" + product.title + "was liked.</p>";  
  }
 
  /**
   * 
   * @param product Produkt, welches gedisliked wird.
   * @returns Nachricht, dass das Prdukt gedisliked wurde.
   */
  dislikeProduct(product : Product): string{
     return "<p>" + product.title + "was disliked.</p>";
  }

 /**
  * 
  * @param id ID nach der die Produktliste gefilter werden soll.
  * @returns Die gefilterte Product-Liste, anhand dedes Filterkriteriums "id".
  */
getProductById(id : string): Product[]{
    return this.productList.filter((p) => p.id.toString() === id);
}

/**
 * 
 * @param likes Amzahl likes eines Produkts
 * @param dislikes Anzahl dislikes eines Produkts.
 * @returns Gibt die Anzahl der Sterne anhand der likes und dislikes zurück.
 */
calcStarRatio(likes: number, dislikes: number){
  return (likes/(likes+dislikes)).toFixed(2);
}

/**
 * 
 * @returns Ruft die Product-Liste vom Server ab und gibt diese zurück.
 */
getProductList(): Observable<any> {
  return this.http.get(baseURL + "/:table/dashboard/products/");
 }

}
