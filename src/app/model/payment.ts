import { ShoppingCart } from './shoppingCart';
export class Payment{
    totalSum!: number;
    shoppingCart!: ShoppingCart[];

    constructor(totalSum: number,  shoppingCart: ShoppingCart[]){
        this.totalSum = totalSum;
        this.shoppingCart = shoppingCart;

    }

}