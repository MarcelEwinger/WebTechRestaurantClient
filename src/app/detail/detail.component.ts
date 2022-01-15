import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../model/product';

import { ProductListService } from './../shared/product-list.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input()
  id!: string;
  product!: Product;
  temp! : Product[]

  constructor(private route: ActivatedRoute,public productListService :ProductListService  ) { 
   
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.temp = this.productListService.getProductById(this.id);
    console.log(this.temp)
    this.product = new Product(this.temp[0].itemid, this.temp[0].title, this.temp[0].description,this.temp[0].price,  this.temp[0].likes, this.temp[0].dislikes, this.temp[0].status );
    console.log("Detail "+ this.product)
   
  }
  calcStarRatio(likes: number, dislikes: number){
    return (likes/(likes+dislikes)).toFixed(2);
  }
}
//hallo
