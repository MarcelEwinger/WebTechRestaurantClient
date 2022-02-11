import { DbService } from './../shared/db.service';

import { ShoppingCart } from './../model/shoppingCart';
import { ProductListService } from './../shared/product-list.service';
import { Product } from './../model/product';
import { Component, Input } from '@angular/core';
import { Category } from '../model/category';

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
    this.productListService.getProductList().subscribe((p : Product[]) =>{
      console.log(p);
    this.products = p;
    console.log(this.products);
    })

  }
 


  sendProduct(product: Product){
    this.productListService.sendProduct(product);
  }

  
  filterByTitle(word: string): Product[]{
    return this.productListService.filterProductsByTitle(word, this.products);
  }

  loadCategories(){
    this.dbService.getCategories().subscribe((c : Category[]) =>{
      this.categories = c;
      
    })
  }
  getCategories(){
    return this.categories;
  }


  

  
  

  
  

}