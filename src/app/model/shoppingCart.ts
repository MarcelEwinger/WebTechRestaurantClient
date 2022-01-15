export class ShoppingCart{
	itemid!: number;
	title!: any;
	quantity!: number;
	price?: number;



	constructor(itemid:number,title: any, quantity: number, price?:number){
		this.itemid = itemid;
		this.title = title
		this.quantity = quantity;
		this.price = price;
	}
}
