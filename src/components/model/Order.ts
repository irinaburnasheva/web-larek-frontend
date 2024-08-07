import {
	IOrder,
} from '../../types/index';
import { IEvents } from '../base/events';
import { IAppEvents } from './AppEvents';



export class Order implements IOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number | undefined;
    items: string[];

    constructor(protected _events: IEvents) {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.total = undefined;
        this.items = [];
    }

	setPayment(payment: string): void {
		this.payment = payment;
	}

	setEmail(email: string): void {
		this.email = email;
	}

	setPhone(phone: string): void {
		this.phone = phone;
	}

	setAddress(address: string): void {
		this.address = address;
	}

	setTotal(total: number): void {
		this.total = total;
	}

	setItems(products: string[]): void {
		this.items = products;
	}

	get orderData(): IOrder {
		return {
			payment: this.payment,
			email: this.email,
			phone: this.phone,
			address: this.address,
			total: this.total,
			items: this.items
		}
	}

	resetOrderData(): void {
		this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.total = undefined;
        this.items = [];
	}
}
