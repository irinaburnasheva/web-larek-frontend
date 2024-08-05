import { ProductCard } from './ProductCard';
import { IProduct } from '../../types';
import { AppEvents, IAppEvents } from '../model/AppEvents';
import { IEvents } from '../base/events';
import { settings } from '../../utils/constants';

export interface IProductCardModalView {
  description: HTMLElement;
  addBasketButton: HTMLElement;
  disableProductNullPrice(): void;
  render(product: IProduct): HTMLElement;
}

export class ProductCardModal extends ProductCard implements IProductCardModalView {
    description: HTMLElement;
    addBasketButton: HTMLElement;
    protected _wrapperElement: HTMLElement;

  constructor(template: HTMLTemplateElement, protected _events: IEvents, appEvents?: IAppEvents) {
    super(template, _events);
    this.description = this._productCardElement.querySelector('.card__text');
    this.addBasketButton = this._productCardElement.querySelector('.card__button');

    this.addBasketButton.addEventListener('click', () => { this._events.emit(AppEvents.PRODUCT_ADD_BASKET) });
  }

  disableProductNullPrice() {
      this.addBasketButton.setAttribute('disabled', 'true');
  }

  render(product: IProduct): HTMLElement {
    this._productCardTitle.textContent = product.title;
    this._productCardCategory.textContent = product.category;
    this._setProductCategoryColor(product);
    this._productCardImage.src = product.image;
    this.description.textContent = product.description;
    this._productCardPrice.textContent = product.price ? String(product.price) + settings.CURRENCY_TEXT : 'Бесценно';
    if (!product.price) this.disableProductNullPrice();
    return this._productCardElement;
  }
}