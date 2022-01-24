import { OrderedItems } from './ordereditems';
export class Order{
    tableid!: number;
    status!: string;
    totalamount!: string;
   

    constructor(tableid: number, status: string, totalamount: string){
        this.tableid = tableid;
        this.status = status;
        this.totalamount = totalamount;

    }
}