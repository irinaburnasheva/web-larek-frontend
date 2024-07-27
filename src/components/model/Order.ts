import {
	IProduct,
	ICustomer,
	IOrder,
	TPayment,
	TDelivery
} from '../../types/index';

class Order implements IOrder {
    items: IProduct[];
    address: string;
	email: string;
	phone: string;
    payment: TPayment;
    total: number;

	setItems(products: string[]): void {
		//реализация
	}

	setContacts(contacts: ICustomer): void {
		//реализация
	}

	setDelivery(delivery: TDelivery): void {
		//реализация
	}

	setPayment(payment: TPayment): void {
		//реализация
	}

	resetOrderData(): void {
		//реализация
	}
}
