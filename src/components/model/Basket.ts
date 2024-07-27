import { IBasket, IProduct } from "../../types";

export abstract class Basket implements IBasket {
    items: IProduct[];
    total: number;

    addProduct(product: IProduct): void {
        //реализация
    }

    deleteProduct(productId: string): void {
         //реализация
    }

    clearBasket(): void {
        //реализация
    }
}