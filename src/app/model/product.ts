// the model for the product, correponding to the attributes from the JSON file

export class Product {
	itemid!: number;
	title?: string;
	description?: string;
	price?: number = 0;
	likes?: number = 0;
	dislikes?: number = 0;
	status?: string;
	allergen?: string;



	constructor(itemid:number, title?: string, description?: string, price?: number, likes?: number, dislikes?: number, status?: string, allergen?: string){
		this.itemid = itemid;
		this.title = title;
		this.description = description;
		this.price = price
		this.likes = likes;
		this.dislikes = dislikes;
		this.status = status;
		this.allergen = allergen;
	}

	
}
