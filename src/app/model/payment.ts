import { ShoppingCart } from './shoppingCart';
export class Payment{
    totalSum!: number;
    shoppingCart!: ShoppingCart[];
    paymentRef!: string;

    constructor(totalSum: number,  shoppingCart: ShoppingCart[], paymentRef: string){
        this.totalSum = totalSum;
        this.shoppingCart = shoppingCart;
        this.paymentRef = paymentRef;

    }

}