import { CustomerModel } from "./customer.model";
import { ProductModel } from "./product.model";
import { StatusModel } from "./status.model";

export class OrderModel {
    constructor(
        public id: number,
        public customer: CustomerModel,
        public status: StatusModel,
        public totalCost: number,
        public date: string,
        public products: ProductModel[],
        public description: string,
        public archived: Boolean
    ) { }
}