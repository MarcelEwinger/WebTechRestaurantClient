import { Category } from './../model/category';
import { DialogProductComponent } from './../dialogProduct/dialogProduct.component';
import { Product } from './../model/product';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from '../shared/db.service';




@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['product.component.css'],
})

export class ProductComponent {

  notAvailable: boolean = false;
  rated: boolean = false;

  @Input()
  product!: Product;
  categories!: Category[]; 
  
  
  /**
   * Emitters werden definiert.
   */
  @Output() likeEmitter: EventEmitter<Product> = new EventEmitter();
  @Output() dislikeEmitter: EventEmitter<Product> =  new EventEmitter();
  @Output() shoppingCartEmitter: EventEmitter<Product> =  new EventEmitter();

  /**
   * 
   * @param dialog Definiert MatDialog, um auf die Methoden der Klasse zugreifen zu können.
   * @param dbService Definiert DBService, um auf die Methoden der Klasse zugreifen zu können.
   */
  constructor(public dialog: MatDialog,  private dbService: DbService){
    setTimeout(()=>{
      this.checkStatus();
    },50);
  }

  /**
   * Methode, mit der der Dialog des Product abgerufen wird.
   */
  openDialog() {
    this.dialog.open(DialogProductComponent, {data: {title: this.product.title, description: this.product.description, allergens: this.product.allergene}});
  }

/**
 * Erhöht die Likes des gelikeden Products.
 */
  incrementLikes(){
    this.likeEmitter.emit(this.product);
    if(this.product.likes != undefined){
      this.product.likes += 1;
    }else{
      this.product.likes = 1;
    }

    //neue Likes in DB schreiben
    this.dbService.setLikesInDB(this.product.id);

    this.rated = true;
  }

/**
 * Erhöht die Dislikes des gelikeden Products.
 */
  incrementDislikes(){
    this.dislikeEmitter.emit(this.product);
    if(this.product.dislikes != undefined){
      this.product.dislikes += 1;
  
    }else{
      this.product.dislikes = 1;
    }
    
    //neue Dislikes in DB schreiben
    this.dbService.setDislikesInDB(this.product.id)
    
    this.rated = true;
  }

  /**
   * Fügt mittels Emitter das Produkt zum Warenkorb hinzu.
   */
  addProduct(){
    this.shoppingCartEmitter.emit(this.product);
  }

  /**
   * 
   * @param likes Anzahl Likes
   * @param dislikes Anzahl Dislikes
   * @returns Gibt die Anzahl der Sterne aufgrund der Likes und Dislikes zurück.
   */
  calcStarRatio(likes: number, dislikes: number){
    return (likes/(likes+dislikes)).toFixed(2);
  }

  /**
   * Prüft, ob eine Produkt verfügbar ist.
   */
  checkStatus(){
      if(this.product.status === "available"){
        this.notAvailable = false;
      }else{
        this.notAvailable = true;
      }   
  }
}