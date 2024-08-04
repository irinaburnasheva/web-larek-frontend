import { IBasket, IProduct } from "../../types";

export class Basket implements IBasket {
    items: IProduct[];

    constructor() {
        this.items = [];
      }
    
    //Получение продуктов в корзине
    get productsInBasket(): IProduct[] {
        return this.items;
    }
    
    //Добавление продукта в корзину
    addProduct(product: IProduct): void {
        this.items.push(product);
    }

    //Удаление продукта из корзины
    deleteProduct(productId: string): void {
        const arr: IProduct[] = this.items.filter(product => product.id == productId);
        if (arr.length > 0) {
            this.items.splice(arr.findIndex(product => product.id === productId), 1);
        }
    }

    //Очистка корзины
    clearBasket(): void {
        this.items = [];
    }
    
    //Получение кол-ва товаров в корзине
    getProductsCount(): number  {
        return this.items.length;
    }

    //Получение общей стоимости продуктов в корзине
    getTotalBasketSum(): number | undefined  {
        if (this.items.length > 0) {
            return this.items.reduce((accumulator, currentValue) => accumulator + (currentValue.price || 0), 0);
        }
        else return undefined;
    }
}