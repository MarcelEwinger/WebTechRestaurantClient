// the model for the product, correponding to the attributes from the JSON file

export class Product {
	id!: number;
	title!: string;
	description!: string;
	price!: number;
	likes!: number;
	dislikes!: number;
	status!: string;
	allergene!: string;
	categories!: string;



	constructor(id:number, title: string, description: string, price: number, likes: number, dislikes: number, status: string, allergene: string, categories: string){
		this.id = id;
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
