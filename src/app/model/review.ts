export class Review{
    reviewdate!: string;
    textcomment!: string;
    stars!: number;
    firstname?: string;
    surname?: string;

    constructor(reviewdate: string, textcomment: string, stars: number, firstname?:string, surname?: string, ){
        this.firstname = firstname;
        this.surname = surname;
        this.reviewdate = reviewdate;
        this.textcomment = textcomment;
        this.stars = stars;

    }
    
  
}