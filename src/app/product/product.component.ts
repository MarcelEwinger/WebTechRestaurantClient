import { Product } from './../model/product';
import { Component, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['product.component.css'],
})

export class ProductComponent {
  @Input()
  product!: Product; 
  
  
  

  @Output() likeEmitter: EventEmitter<Product> = new EventEmitter();
  @Output() dislikeEmitter: EventEmitter<Product> =  new EventEmitter();
  @Output() shoppingCartEmitter: EventEmitter<Product> =  new EventEmitter();


  incrementLikes(){
    this.likeEmitter.emit(this.product);
    if(this.product.likes != undefined){
      this.product.likes += 1;
    }else{
      this.product.likes = 1;
    }
    
  }

  incrementDislikes(){
    this.dislikeEmitter.emit(this.product);
    if(this.product.dislikes != undefined){
      this.product.dislikes += 1;
  
    }else{
      this.product.dislikes = 1;
    }  
  }
  addProduct(){
    this.shoppingCartEmitter.emit(this.product);
     
      
    
    
  }
  calcStarRatio(likes: number, dislikes: number){
    return (likes/(likes+dislikes)).toFixed(2);
  }

}
