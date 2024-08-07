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
    isValid(status: boolean): void;
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
      this.submitButtonElement = this.orderFormElement.querySelector('button[type="submit"]');
      this.errorElement = this.orderFormElement.querySelector('.form__errors');
      this.paymentTypeSelected = '';

      this.paymentTypeButtons.forEach(button => {
        button.addEventListener('click', (evt: Event) => {
          this.paymentTypeSelected = button.name;
          this. setPaymentTypeSelected(this.paymentTypeSelected);
          this._events.emit(AppEvents.ORDER_FORM_UPDATE);
        });
      });

      this.addressInputElement.addEventListener('input', () => {
        this._events.emit(AppEvents.ORDER_FORM_UPDATE);
      });

      this.orderFormElement.addEventListener('submit', (evt: SubmitEvent) => {
        evt.preventDefault();

        this._events.emit(AppEvents.CONTACTS_FORM_SHOW);
      });
    }

    get addressInput(){
      return this.addressInputElement;
    };

    setPaymentTypeSelected(type: string) {
        this.paymentTypeButtons.forEach(button => {
          button.classList.toggle('button_alt-active', button.name === type);
        })
    };

    isValid(status: boolean) {
      this.submitButtonElement.disabled = !status;
    };

    render(){
      return this.orderFormElement;
    }
  }