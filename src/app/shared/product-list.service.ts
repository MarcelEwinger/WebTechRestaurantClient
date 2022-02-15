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

  

  sendProduct(product: Product){
    this.subject.next(product);
  }

  getProduct():Observable<any>{
    return this.subject.asObservable();

  }
  
  constructor(private http: HttpClient) { 
  }

 

  filterProductsByTitle(word : string, list: Product[]) : Product[]{
    if(word == ''){
      return list;
    }else{
      return list.filter((p) => p.title?.toLowerCase().includes(word.toLowerCase()));
    }

  }
  filterProductsByCategory(category: Category, list: Product[]) : Product[]{
    return list.filter((p) => p.categories.includes(category.name));
   

  }

  likeProduct(product : Product): string{
    return  "<p>" + product.title + "was liked.</p>";  
  }
 
  dislikeProduct(product : Product): string{
     return "<p>" + product.title + "was disliked.</p>";
  }

 
getProductById(id : string): Product[]{
    return this.productList.filter((p) => p.id.toString() === id);
}


calcStarRatio(likes: number, dislikes: number){
  return (likes/(likes+dislikes)).toFixed(2);
}

getProductList(): Observable<any> {
  return this.http.get(baseURL + "/:table/dashboard/products/");
 }

}
