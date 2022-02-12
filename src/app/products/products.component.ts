import { Category } from './../model/category';
import { DbService } from './../shared/db.service';

import { ShoppingCart } from './../model/shoppingCart';
import { ProductListService } from './../shared/product-list.service';
import { Product } from './../model/product';
import { Component, Input } from '@angular/core';
import { merge } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['products.component.css']

})
export class ProductsComponent {

  @Input()
  products!: Product[];
  word: string = "";
  shoppingCart: ShoppingCart[] = []
  count: number = 0;

  categories: Category[] = [];
  

  constructor(private productListService :ProductListService, private dbService: DbService) {
    this.loadCategories();
    this.productListService.getProductList().subscribe((p) =>{
      //this.products = [];
      //console.log(p);
      let obj1 = p.menuItems;
      let obj2 = p.topSeller;
      let finalObj: Product[] = [];
      for(let x of obj1){
        finalObj.push(x);
      } 
      for(let x of obj2){
        finalObj.push(x);

      }
      console.log(finalObj);
      this.products = finalObj;
    });
   
  }
  
 


  sendProduct(product: Product){
    this.productListService.sendProduct(product);
    
  }


  filterByTitle(word: string): Product[]{
    return this.productListService.filterProductsByTitle(word, this.products);
  }

  filterByCategory(category: Category): Product[]{
    return this.productListService.filterProductsByCategory(category, this.products);


  }

  loadProducts(){
    this.productListService.getProductList().subscribe((p : Product[]) =>{
      this.products = p;
     
      console.log(this.products);
    });
  }

  getProducts(){
    return this.products;
  }
  

 

  loadCategories(){
    this.dbService.getCategories().subscribe((c : Category[]) =>{
      this.categories = c;
      this.categories.unshift(new Category(0, "Top Seller", "Top Seller"));
      //console.log(this.categories);
    })
  }
  getCategories(){
    return this.categories;
  }


  

  
  

  
  

}