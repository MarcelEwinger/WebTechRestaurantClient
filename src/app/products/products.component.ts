import { Category } from './../model/category';
import { DbService } from './../shared/db.service';

import { ShoppingCart } from './../model/shoppingCart';
import { ProductListService } from './../shared/product-list.service';
import { Product } from './../model/product';
import { Component, HostListener, Input } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['products.component.css']
})


export class ProductsComponent{

  @Input()
  products!: Product[];
  word: string = "";
  shoppingCart: ShoppingCart[] = []
  count: number = 0;

  categories: Category[] = [];


  public tabName: string = "0";

  private topSellers: Product[] = [];

  

  constructor(private productListService :ProductListService, private dbService: DbService) {
    this.loadCategories();
    this.productListService.getProductList().subscribe((p) =>{
      let obj1 = p.menuItems;
      let obj2 = p.topSeller;
      let finalObj: Product[] = [];
      for(let x of obj1){
        finalObj.push(x);
      } 
      for(let x of obj2){
        console.log("Top seller: " + x);
        finalObj.push(x);
        this.topSellers.push(x);

      }
      console.log(finalObj);
      this.products = finalObj;
    });
   
  }


  onTabChange(event: MatTabChangeEvent) {
    this.tabName = event.tab.textLabel;
  }
  
  getTopSellers(word: string): Product[]{

    if(word.length == 0){
      return this.topSellers;
    }else{
      return this.productListService.filterProductsByTitle(word, this.topSellers);
    }

  }
 


  sendProduct(product: Product){
    this.productListService.sendProduct(product);
    
  }


  filterByTitle(word: string): Product[]{
    return this.productListService.filterProductsByTitle(word, this.products);
  }

  filterByCategory(category: Category, word: string): Product[]{

    if(word.length == 0){
      return this.productListService.filterProductsByCategory(category, this.products);
    }else{

      let p: Product[] = this.productListService.filterProductsByCategory(category, this.products);

      return this.productListService.filterProductsByTitle(word, p);
    }

    


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
    })
  }
  getCategories(){
    return this.categories;0
  }


}