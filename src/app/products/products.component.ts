
import { ShoppingCart } from './../model/shoppingCart';
import { ProductListService } from './../shared/product-list.service';
import { Product } from './../model/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['products.component.css']

})
export class ProductsComponent {

  @Input()
  products!: Product[];
  idVal!: string;
  nameVal!: string;
  reactionVal!: string;
  error: string = "";

  message: string = "";
  word: string = "";
  priceVal! : number;
  descriptionVal! : string;
  tagsVal!: string;

  shoppingCart: ShoppingCart[] = []

  count: number = 0;
  

  

  constructor(private productListService :ProductListService) {
    this.productListService.getProductList().subscribe((p : Product[]) =>{
    this.products = p;
    console.log(this.products);
    })


  }
 


  sendProduct(product: Product){
    this.productListService.sendProduct(product);
  }

  /*
  incrementLikes(product : Product): void{
    this.message = this.productListService.likeProduct(product)
   }
   

   incrementDislikes(product : Product): void{
    this.message = this.productListService.dislikeProduct(product)
  }
  */

  filterByTitle(word: string ): Product[]{
    return this.productListService.filterProductsByTitle(word, this.products);
  }


  

  
  

  
  

}