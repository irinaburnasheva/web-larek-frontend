import { IProduct } from '../../types';

export abstract class Product implements IProduct {
	id: string;
	title: string;
	description: string;
	category: string;
	price: number | null;
	image: string;
	inBasket: boolean;

	constructor(data: IProduct) {
		this.id = data.id;
		this.title = data.title;
		this.description = data.description;
		this.category = data.category;
		this.price = data.price || null;
		this.image = data.image;
		this.inBasket = false;
	}
}