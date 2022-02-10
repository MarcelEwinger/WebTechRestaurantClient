export class Category{
    categoryid!: number;
    name!: string;
    description!: string;

    constructor(categoryid: number, name: string, description: string){
        this.categoryid = categoryid;
        this.name = name;
        this.description = description;

    }
}