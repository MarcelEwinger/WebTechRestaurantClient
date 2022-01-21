import { Review } from './../model/review';
import { DbService } from './../shared/db.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input()
  reviews: Review[] = [];
  selectedValue ="";


  constructor(private dbService: DbService) {
    this.getReview();
   }

  ngOnInit() {
  }
  
  loadReviews(): Review[]{
    return this.reviews;

  }

  getReview(){
    this.dbService.getReviews().subscribe((p : Review[]) =>{
      this.reviews = p;
      for(let s of this.reviews){
        const str  = s.reviewdate.split("T");
        s.reviewdate = str[0];
  
      }
      //console.log(this.reviews);
      //console.log(p);
      })
  }
  addReview(){
    const firstname = (<HTMLInputElement>document.getElementById("firstname")).value;
    const surename = (<HTMLInputElement>document.getElementById("surename")).value;
    const txt = (<HTMLInputElement>document.getElementById("txt")).value;
    const stars = this.selectedValue;
    const reviewdate  = new Date().toISOString().slice(0, 10);
    //console.log(firstname, surename, stars, txt, reviewdate);
    this.dbService.newReview(new Review(reviewdate,txt, Number(stars),firstname, surename));
    setTimeout(() =>{
      this.getReview();
    }, 1000);
   
    
  }

  
  

}
