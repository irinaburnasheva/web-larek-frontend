import { IEvents } from '../base/events';
import { IAppEvents } from '../model/AppEvents';
import { IProduct } from '../../types'; 
import { settings } from '../../utils/constants';
import { cloneTemplate, getKeyByValue } from '../../utils/utils';

export class ProductCard {
    protected _productCardElement: HTMLElement;
    protected _productCardTitle: HTMLElement;
    protected _productCardCategory: HTMLElement;
    protected _productCardImage: HTMLImageElement;
    protected _productCardPrice: HTMLElement;


    constructor(template: HTMLTemplateElement, protected _events: IEvents, appEvents?: IAppEvents) {
        this._productCardElement = cloneTemplate(template);
        this._productCardTitle = this._productCardElement.querySelector('.card__title');
        this._productCardCategory = this._productCardElement.querySelector('.card__category');
        this._productCardImage = this._productCardElement.querySelector('.card__image');
        this._productCardPrice = this._productCardElement.querySelector('.card__price');

        if (appEvents?.onClick) {
            this._productCardElement.addEventListener('click', appEvents.onClick);
          }
    }

    protected _setProductCategoryColor(product: IProduct):void {
        this._productCardCategory.className = `card__category card__category_${getKeyByValue(settings.PRODUCT_CATEGORIES_COLOR, product.category)}`;
    }

    render(product: IProduct): HTMLElement {
        this._productCardTitle.textContent = product.title;
        this._productCardCategory.textContent = product.category;
        this._setProductCategoryColor(product);
        this._productCardImage.src = product.image;
        this._productCardImage.alt = this._productCardTitle.textContent;
        this._productCardPrice.textContent = product.price ? String(product.price) + settings.CURRENCY_TEXT : 'Бесценно';
        return this._productCardElement;
      }
}