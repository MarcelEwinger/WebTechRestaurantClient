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

  

  /**
   * 
   * @param productListService Definiert ProductListService, um auf die Methoden der Klasse zuzugreifen.
   * @param dbService Definiert DB-Service, um auf die Dienste des Service zuzugreifen.
   * 
   * Fragt die Prdoducte vom Server ab und speichert diese in finalObj und in topSellers.
   */
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
        finalObj.push(x);
        this.topSellers.push(x);

      }
      this.products = finalObj;
    });
   
  }

/**
 * 
 * @param event Event, wenn der Reiter gewchselt wird.
 * 
 * Wenn der Tab gewechselt wird, wird der akteulle Name des Tabs zurückgegeben.
 */
  onTabChange(event: MatTabChangeEvent) {
    this.tabName = event.tab.textLabel;
  }
  
  /**
   * 
   * @param word Filterkriterium
   * @returns Gibt ein Product-Array von den Top-Sellern zurück.
   * 
   * Wenn ein Filterkriterium vorhanden ist, wird das gefilterte Product-Array zurückgegeben.
   */
  getTopSellers(word: string): Product[]{

    if(word.length == 0){
      return this.topSellers;
    }else{
      return this.productListService.filterProductsByTitle(word, this.topSellers);
    }

  }
 

/**
 * 
 * @param product Übergabeparamter (Product), welcher gesendet wird.
 */
  sendProduct(product: Product){
    this.productListService.sendProduct(product);
    
  }

/**
 * 
 * @param word Filterkriterium
 * @returns Gibt das Gefilterte Product-Array zurück.
 */
  filterByTitle(word: string): Product[]{
    return this.productListService.filterProductsByTitle(word, this.products);
  }

  /**
   * 
   * @param category Kategorie, nach der gefiltert werden soll.
   * @param word Schlüsselwort nach dem gefiltert werden soll.
   * @returns Das gefilterte Product-Array, anhand des Filterkriteriums Kategorie und Schlüsselwort (falls vorhanden).
   */
  filterByCategory(category: Category, word: string): Product[]{

    if(word.length == 0){
      return this.productListService.filterProductsByCategory(category, this.products);
    }else{

      let p: Product[] = this.productListService.filterProductsByCategory(category, this.products);

      return this.productListService.filterProductsByTitle(word, p);
    }

  }

  /**
   * Ladet die Produkte hintereinander in das Product-Array.
   */
  loadProducts(){
    this.productListService.getProductList().subscribe((p : Product[]) =>{
      this.products = p;
    });
  }

  /**
   * 
   * @returns Prduct-Array der Klasse.
   */
  getProducts(){
    return this.products;
  }
  
/**
 * Ruft alle Kategorien vom Server (aus der DB) ab und speichert diese im Categories-Array.
 */
  loadCategories(){
    this.dbService.getCategories().subscribe((c : Category[]) =>{
      this.categories = c;
      this.categories.unshift(new Category(0, "Top Seller", "Top Seller"));
    })
  }

/**
 * 
 * @returns Categories-Array der Klasse.
 */
  getCategories(){
    return this.categories;0
  }


}