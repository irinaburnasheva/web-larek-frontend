import { IEvents } from "../base/events";

export abstract class Basket {
    protected _basketContent: HTMLElement;
    protected _basketProductsList: HTMLElement;
    protected _basketTotalPrice: HTMLElement;
    protected _basketConfirmButton: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, protected _events: IEvents) {
        this._basketContent = template.querySelector('.basket').cloneNode(true) as HTMLElement;
        this._basketProductsList = this._basketContent.querySelector('.basket__list');
        this._basketTotalPrice = this._basketContent.querySelector('.basket__price');
        this._basketConfirmButton = this._basketContent.querySelector('.basket__button');

        this._basketConfirmButton.addEventListener('click', () => { this._events.emit('modal:open') });

    }

    render() {

    };
}