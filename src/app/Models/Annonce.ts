import {Category} from "./Category";
export class Annonce {
    public user_id :Number;

        constructor(public id, public title: string, public description: string, public category: Category, public city: string, public phone, public picture: string ) {

    }

}