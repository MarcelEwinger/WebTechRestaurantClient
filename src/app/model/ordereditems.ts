export class OrderedItems{
    ordereditemsid!: number;
    itemid!: number;
    quantity!: number;
    status!: string;
    orderid!: number;
    orderdate!: string;
    title!:string

    constructor(ordereditemsid: number, itemid: number,quantity: number, status:string, orderid: number, orderdate: string, title:string){
        this.ordereditemsid = ordereditemsid;
        this.itemid = itemid;
        this.quantity  =quantity;
        this.status = status;
        this.orderid;
        this.orderdate = orderdate;
        this.title = title;

    }
}