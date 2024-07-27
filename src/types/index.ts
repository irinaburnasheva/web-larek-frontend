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
    inBasket: boolean;
}

//Покупатель
export interface ICustomer {
    phone: string;
    email: string;
    address?: string;
}

//Тип оплаты
export type TPayment = 'online' | 'cash';


//Этап оформления заказа
export type TOrderStatus = 'basket' | 'payment' | 'contacts' | 'ordered';

//Корзина
export interface IBasket {
    items: IProduct[];
    total: number;

    addProduct(product: IProduct): void;
    deleteProduct(productId: string): void;
    clearBasket(): void;
}

//Заказ
export interface IOrder {
    items: IProduct[];
    address: string;
	email: string;
	phone: string;
    payment: TPayment;
    total: number;

    setItems(products: string[]): void;
    setContacts(contacts: ICustomer): void;
    setDelivery(delivery: string): void;
    setPayment(payment: TPayment): void;
    resetOrderData(): void;
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

//Состояние приложения
export interface IAppState {
    catalog: IProduct[];
    basket: IProduct[];
    order: IOrder;
    customerInfo: ICustomer;
    delivery: string;
    payment: TPayment;
  }

//Типы событий в приложении
export enum AppEvents {
    CATALOG_ONLOAD = 'catalog:onload',
    CATALOG_UPDATE = 'catalog:update',
    MODAL_OPEN = 'modal:open',
    BASKET_UPDATE = 'basket:update',
    BASKET_CLEAR = 'basket:clear',
    ORDER_UPDATE = 'order:update',
    ORDER_CONFIRM = 'order:confirm',
    ORDER_CLEAR = 'order:clear'
}

//Интерфейс для взаимодействием с сервером
export interface ILarekApi {
	getProductsList: () => Promise<ICatalogProductListResult>;
	getProductData: (id: string) => Promise<IProduct>;
	createOrder: (confirmedOrder: IOrderConfirmed) => Promise<IOrderConfirmed>;
}

//Интерфейс для рендера контента и навешивание обработчиков событий
export interface IView {
    element: HTMLElement;
	events: IEvents;
    render(args?: object): unknown;
}