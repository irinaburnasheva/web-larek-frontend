import { IProduct } from '../../types';
import { IAppEvents } from '../model/AppEvents'
import { cloneTemplate } from '../../utils/utils';
import { IEvents } from '../base/events';
import { settings } from '../../utils/constants';

export interface IBasketProductView {
    basketTemplateElement: HTMLTemplateElement;
    basketProductElement: HTMLElement;
    basketProductIndex:HTMLElement;
    basketProductTitle: HTMLElement;
    basketProductPrice: HTMLElement;
    basketProductDeleteButton: HTMLButtonElement;
    render(product: IProduct, index: number): HTMLElement;
}

export class BasketProduct {
    basketProductElement: HTMLElement;
    basketProductIndex:HTMLElement;
    basketProductTitle: HTMLElement;
    basketProductPrice: HTMLElement;
    basketProductDeleteButton: HTMLButtonElement;
    basketTemplateElement: HTMLTemplateElement;

    constructor(template: HTMLTemplateElement, protected _events: IEvents, AppEvents?: IAppEvents){
        this.basketProductElement = cloneTemplate(template);
        this.basketProductIndex = this.basketProductElement.querySelector('.basket__item-index');
        this.basketProductTitle = this.basketProductElement.querySelector('.card__title');
        this.basketProductPrice = this.basketProductElement.querySelector('.card__price');
        this.basketProductDeleteButton = this.basketProductElement.querySelector('.basket__item-delete');

        if(AppEvents.onClick) {
            this.basketProductDeleteButton.addEventListener('click', AppEvents.onClick)
        }
    }

    render(product: IProduct, index: number): HTMLElement {
        this.basketProductIndex.textContent = String(index);
        this.basketProductTitle.textContent = product.title;
        this.basketProductPrice.textContent = product.price ? String(product.price) + settings.CURRENCY_TEXT : 'Бесценно';

        return this.basketProductElement;
    }
}