import { IEvents } from '../components/base/events';

//Типы данных, используемые в приложении
//Продукт
export interface IProduct {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number | null;
    image: string;
}

//Корзина
export interface IBasket {
    items: IProduct[];

    addProduct(product: IProduct): void;
    deleteProduct(productId: string): void;
    clearBasket(): void;
    getProductsCount(): number | undefined ;
    getTotalBasketSum(): number | undefined ;
}

//Заказ
export interface IOrder {
    items: string[];
    address: string;
	email: string;
	phone: string;
    payment: string;
    total: number;
}

//Получены данные для каталога с сервера
export interface ICatalogProductListResult {
    total: number; 
    items: IProduct[];
}

//Запрос для оформления заказа
export interface IOrderConfirmed extends IBasket {
    items: IProduct[];
    total: number;
}

export interface IOrderConfirmedResponse {
    id: string;
    total: number;
}

//Интерфейс для взаимодействием с сервером
export interface ILarekApi {
    baseUrl: string;
	getProductsList: () => Promise<IProduct[]>;
	getProductData: (id: string) => Promise<IProduct>;
	createOrder: (confirmedOrder: IOrder) => Promise<IOrderConfirmedResponse>;
}

//Интерфейс для рендера контента и навешивание обработчиков событий
export interface IView {
    element: HTMLElement;
	events: IEvents;
    render(args?: object): unknown;
}