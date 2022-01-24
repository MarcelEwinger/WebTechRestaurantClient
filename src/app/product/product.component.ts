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
  
  
  
  @Output() likeEmitter: EventEmitter<Product> = new EventEmitter();
  @Output() dislikeEmitter: EventEmitter<Product> =  new EventEmitter();
  @Output() shoppingCartEmitter: EventEmitter<Product> =  new EventEmitter();

  constructor(public dialog: MatDialog,  private dbService: DbService){
    setTimeout(()=>{
      this.checkStatus();
    },50);
  }

  openDialog() {
    this.dialog.open(DialogProductComponent, {data: {title: this.product.title, description: this.product.description, allergens: this.product.allergen}});
  }


  incrementLikes(){
    this.likeEmitter.emit(this.product);
    if(this.product.likes != undefined){
      this.product.likes += 1;
    }else{
      this.product.likes = 1;
    }

    //neue Likes in DB schreiben
    this.dbService.setLikesInDB(this.product.itemid);

    this.rated = true;
  }


  incrementDislikes(){
    this.dislikeEmitter.emit(this.product);
    if(this.product.dislikes != undefined){
      this.product.dislikes += 1;
  
    }else{
      this.product.dislikes = 1;
    }
    
    //neue Dislikes in DB schreiben
    this.dbService.setDislikesInDB(this.product.itemid)
    
    this.rated = true;
  }
  addProduct(){
    this.shoppingCartEmitter.emit(this.product);
     
    
  }
  calcStarRatio(likes: number, dislikes: number){
    return (likes/(likes+dislikes)).toFixed(2);
  }

  checkStatus(){
      if(this.product.status === "available"){
        this.notAvailable = false;
      }else{
        this.notAvailable = true;
      }
    
  }

}




