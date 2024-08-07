import { ApiListResponse, Api } from '../base/api';
import { ILarekApi, IProduct, IOrderConfirmed, IOrderConfirmedResponse, IOrder } from '../../types';

export class AppApi extends Api implements ILarekApi {
    cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

    //Получение информации по продукту по id для превью
    getProductData(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image
		}));
	}

    //Получение товаров для каталога
    getProductsList(): Promise<IProduct[]> {
        return this.get('/product').then((data: ApiListResponse<IProduct>) =>
            data.items.map((item) => ({
              ...item,
              image: this.cdn + item.image
            }))
          );
    };

    //Оформление заказа
    createOrder(confirmedOrder: IOrder): Promise<IOrderConfirmedResponse> {
        return this.post(`/order`, confirmedOrder).then((data: IOrderConfirmedResponse) => data);
    }
}