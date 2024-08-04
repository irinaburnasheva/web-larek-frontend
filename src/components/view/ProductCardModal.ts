import { ProductCard } from "./ProductCard";
import { IProduct, IAppEvents } from "../../types";
import { IEvents } from "../base/events";

export interface IProductCardModalView {
  description: HTMLElement;
  addBasketButton: HTMLElement;
  render(product: IProduct): HTMLElement;
}

export class ProductCardModal extends ProductCard implements IProductCardModalView {
    description: HTMLElement;
    addBasketButton: HTMLElement;

  constructor(template: HTMLTemplateElement, protected _events: IEvents, appEvents?: IAppEvents) {
    super(template, _events);
    this.description = this._productCardElement.querySelector('.card__text');
    this.addBasketButton = this._productCardElement.querySelector('.card__button');
    this.addBasketButton.addEventListener('click', () => { this._events.emit('card:addBasket') });
  }

  notSale(product:IProduct) {
    if(product.price) {
      return 'Купить'
    } else {
      this.addBasketButton.setAttribute('disabled', 'true')
      return 'Нельзя купить'
    }
  }

  render(product: IProduct): HTMLElement {
    this._productCardCategory.textContent = product.category;
    this.setProductCategory(product);
    this._productCardTitle.textContent = product.title;
    this._productCardImage.src = product.image;
    this._productCardPrice.textContent = String(product.price);
    this.description.textContent = product.description;
    this.addBasketButton.textContent = this.notSale(product);
    return this._productCardElement;
  }
}