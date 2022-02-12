import { Review } from './../model/review';
import { DbService } from './../shared/db.service';
import { Component, Input, OnInit } from '@angular/core';
import Uwuifier from 'uwuifier';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  private uwuifier = new Uwuifier();

  @Input()
  reviews: Review[] = [];
  selectedValue ="";
  Allmonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];


  constructor(private dbService: DbService) {
    this.getReview();
    
   }

  ngOnInit() {
  }
  
  loadReviews(): Review[]{
    return this.reviews;

  }

  getReview(){
    console.log("Load Reviews")
    this.dbService.getReviews().subscribe((p : Review[]) =>{
      this.reviews = p;
      for(let s of this.reviews){
        const str  = s.reviewdate.split("T");
        s.reviewdate = str[0];
        const arr = str[0].split('-')
        s.year = arr[0];
        s.day = arr[2];
        s.month = this.Allmonth[new Date(s.reviewdate).getMonth()];
      }
      })
  }

  checkInputs(val: any){
    let alertText: string[] = [];
    let status: boolean = true;
    const firstname = val.firstname;
    const surename = val.surename;
    const txt = val.txt;
    const stars = val.stars;

    if(firstname === null || firstname === ''){
      alertText.push("Please enter your firstname");
      status = false
    }
    if(surename === null || surename === ''){
      alertText.push("Please enter your surename")
      status = false
    }
    if(txt === null || txt === ''){
      alertText.push("Please descripe your experience")
      status = false
    }
    if(stars === null || stars === ''){
      alertText.push("Please select your experience ")
      status = false
    }

   if(status === true){
    console.log("Allright")
    this.addReview(firstname, surename, stars, txt)
   }else{
     alert(alertText);
   }
  }

  addReview(firstname: string, surename: string, stars: string, txt: string){
    const reviewdate  = new Date().toISOString().slice(0, 10);
    let newTxt = this.uwuifier.uwuifySentence(txt);
    this.dbService.newReview(new Review(reviewdate,newTxt, Number(stars),firstname, surename));
    
    setTimeout(() =>{
      this.getReview();
    }, 1000);
   
  }

 
 

 

  

  

 

}
