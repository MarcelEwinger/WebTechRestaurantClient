import { ShoppingCart } from './../model/shoppingCart';
import { Product } from './../model/product';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import globalProductList from '../../assets/menu_Items.json';
import { Observable, Subject } from 'rxjs';

const baseURL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  private productList!: Product[];
  private shoppingCart: ShoppingCart[] = []

  private subject = new Subject<any>();

  

  sendProduct(product: Product){
    this.subject.next(product);
  }

  getProduct():Observable<any>{
    return this.subject.asObservable();

  }
  
  constructor(private http: HttpClient) { 
    this.productList = globalProductList;
  }

 

  filterProductsByTitle(word : string, list: Product[]) : Product[]{
    if(word == ''){
      return list;
    }else{
      return list.filter((p) => p.title?.toLowerCase().includes(word.toLowerCase()));
    }

  }

  likeProduct(product : Product): string{
    console.log(product.likes);
    return  "<p>" + product.title + "was liked.</p>";  
  }
 
  dislikeProduct(product : Product): string{
     console.log(product.dislikes);
     return "<p>" + product.title + "was disliked.</p>";
  }

 
getProductById(id : string): Product[]{
    return this.productList.filter((p) => p.itemid.toString() === id);
}


calcStarRatio(likes: number, dislikes: number){
  return (likes/(likes+dislikes)).toFixed(2);
}

getProductList(): Observable<any> {
  return this.http.get(baseURL + "/products/");
 }


 









  
}
