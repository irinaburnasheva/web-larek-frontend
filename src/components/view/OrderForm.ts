import { AppEvents } from '../model/AppEvents';
import { cloneTemplate } from '../../utils/utils';
import { IEvents } from '../base/events';

export interface IOrderForm {
    orderFormElement: HTMLFormElement;
    paymentTypeButtons: HTMLButtonElement[];
    addressInputElement: HTMLInputElement;
    submitButtonElement: HTMLButtonElement;
    errorElement: HTMLElement;
    paymentTypeSelected: string;
    setPaymentTypeSelected(type: string): void;
    render(): HTMLElement;
  }

  export class OrderForm implements IOrderForm {
    orderFormElement: HTMLFormElement;
    paymentTypeButtons: HTMLButtonElement[];
    addressInputElement: HTMLInputElement;
    submitButtonElement: HTMLButtonElement;
    errorElement: HTMLElement;
    paymentTypeSelected: string;

    constructor(protected _events: IEvents){
      this.orderFormElement = cloneTemplate(document.getElementById('order') as HTMLTemplateElement);
      this.paymentTypeButtons = Array.from(this.orderFormElement.querySelectorAll('.button_alt'));
      this.addressInputElement = this.orderFormElement.querySelector('.form__input');
      this.submitButtonElement = this.orderFormElement.querySelector('.order__button');
      this.errorElement = this.orderFormElement.querySelector('.form__errors');

      this.paymentTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
          this.paymentTypeSelected = button.name;
          _events.emit(AppEvents.ORDER_PAYMENT_CHOICE, button);
        });
      });

      this.addressInputElement.addEventListener('input', () => {
        const field = this.addressInputElement.name;
        const value = this.addressInputElement.value;
        this._events.emit(AppEvents.ORDER_ADDRESS_ADD, { field, value });
      });

      this.submitButtonElement.addEventListener('submit', (evt: MouseEvent) => {
        evt.preventDefault();
        this._events.emit(AppEvents.CONTACTS_SHOW);
      });
    }

    setPaymentTypeSelected(type: string) {
        this.paymentTypeButtons.forEach(button => {
          button.classList.toggle('button_alt-active', button.name === type);
        })
    }

    isValid(value: boolean) {
      this.submitButtonElement.disabled = !value;
    }

    render(){
      return this.orderFormElement;
    }
  }