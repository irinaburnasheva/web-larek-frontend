import {
	IAppState,
	IProduct,
	ICustomer,
	IOrder,
	TPayment,
	TOrderStatus,
} from '../../types';


enum AppEvents {
    
}

abstract class AppState implements IAppState {
	order: IOrder;
	customerInfo: ICustomer;
	delivery: string;
	payment: TPayment;
	catalog: IProduct[];
	basket: IProduct[];

	constructor(order: IOrder, customerInfo:ICustomer, delivery: string, payment: TPayment, catalog: IProduct[], basket: IProduct[]) {
		this.order = order;
		this.customerInfo = customerInfo;
		this.delivery = delivery;
		this.payment = payment;
		this.basket	= basket;
	}
	
}