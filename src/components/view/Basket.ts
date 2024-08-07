import { AppEvents } from '../model/AppEvents';
import { cloneTemplate, createElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { IBasketProductView } from './BasketProduct';
import { settings } from '../../utils/constants';

export interface IBasketView {
    basketElement: HTMLElement;
    basketProductsList: HTMLElement;
    basketTotalPrice: HTMLElement;
    basketConfirmButton: HTMLButtonElement;
    headerBasketButton: HTMLElement;
    headerBasketProductsCounter: HTMLElement;
    basketProducts: IBasketProductView[];

    renderBasketProducts(basketProducts: HTMLElement[]): void;
    renderHeaderBasketProductCounter(value: number): void;
    renderTotalSum(totalSum: number): void;
    render(): HTMLElement;
}

export class Basket implements IBasketView {
    basketElement: HTMLElement;
    basketProductsList: HTMLElement;
    basketTotalPrice: HTMLElement;
    basketConfirmButton: HTMLButtonElement;
    headerBasketButton: HTMLElement;
    headerBasketProductsCounter: HTMLElement;
    basketProducts: IBasketProductView[];

    constructor(template: HTMLTemplateElement, protected _events: IEvents) {
        this.basketElement = cloneTemplate(template);
        this.basketProductsList = this.basketElement.querySelector('.basket__list');
        this.basketTotalPrice = this.basketElement.querySelector('.basket__price');
        this.basketConfirmButton = this.basketElement.querySelector('.basket__button');
        //для взаимодействия с корзиной на главном экране
        this.headerBasketButton = document.querySelector('.header__basket');
        this.headerBasketProductsCounter = document.querySelector('.header__basket-counter');

        this.basketConfirmButton.addEventListener('click', () => { this._events.emit(AppEvents.ORDER_FORM_SHOW)});
        this.headerBasketButton.addEventListener('click', () => {this._events.emit(AppEvents.BASKET_SHOW)})
    }

    renderBasketProducts(products: HTMLElement[]){
        if (products.length) {
            this.basketProductsList.replaceChildren(...products);
            this.basketConfirmButton.removeAttribute('disabled');

          } else {
            this.basketConfirmButton.setAttribute('disabled', 'true');
            this.basketProductsList.replaceChildren(createElement<HTMLElement>('span', { textContent: '' }));
          }
    };

    renderHeaderBasketProductCounter(value: number) {
            this.headerBasketProductsCounter.textContent = String(value);
    };

    renderTotalSum(totalSum: number | null) {
        if (totalSum) {
            this.basketTotalPrice.textContent = String(totalSum + settings.CURRENCY_TEXT);
        } else {
            this.basketTotalPrice.textContent = '';
        }
    };

    render() {
       return this.basketElement;
    };
}