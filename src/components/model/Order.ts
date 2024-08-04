import {
	IProduct,
	ICustomer,
	IOrder,
	TPayment,
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

	setDelivery(delivery: string): void {
		//реализация
	}

	setPayment(payment: TPayment): void {
		//реализация
	}

	resetOrderData(): void {
		//реализация
	}
}
