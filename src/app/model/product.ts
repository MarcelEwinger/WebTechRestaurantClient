// the model for the product, correponding to the attributes from the JSON file

export class Product {
	itemid!: number;
	title!: string;
	description!: string;
	price!: number;
	likes!: number;
	dislikes!: number;
	status!: string;
	allergene!: string;
	categories!: string;



	constructor(itemid:number, title: string, description: string, price: number, likes: number, dislikes: number, status: string, allergene: string, categories: string){
		this.itemid = itemid;
		this.title = title;
		this.description = description;
		this.price = price
		this.likes = likes;
		this.dislikes = dislikes;
		this.status = status;
		this.allergene = allergene;
		this.categories = categories;
	}

	
}
