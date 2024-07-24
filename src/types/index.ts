//Интерфейс товара

interface IProduct {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number | null;
    image: string;
}

interface ICustomer {
    phone: string;
    mail: string;
    address: string;
}

type TPayment = 'card' | 'cash';

type TDelivery = 'pickup' | 'delivery';

type TOrderStatus = 'basket' | 'payment' | 'contacts' | 'ordered';

interface IOrder {
    id: string;
    products: IProduct[];
    customer: ICustomer;
    payment: TPayment;
    delivery: TDelivery;
    totalSum: number;
    status: TOrderStatus;
}

export { IProduct, ICustomer, IOrder};