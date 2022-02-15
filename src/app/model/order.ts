import { OrderedItems } from './ordereditems';

export class Order{
    tableid!: number;
    status!: string;
    totalamount!: string;
    orderedItems!: OrderedItems[];
   

    constructor(tableid: number, status: string, totalamount: string, orderedItems: OrderedItems[]){
        this.tableid = tableid;
        this.status = status;
        this.totalamount = totalamount;
        this.orderedItems = orderedItems;

    }
}