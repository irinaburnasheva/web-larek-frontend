import { settings } from "../../utils/constants";
import { cloneTemplate } from "../../utils/utils";
import { IEvents } from "../base/events";
import { AppEvents } from "../model/AppEvents";

export interface IOrderStatus {
    orderStatusElement: HTMLElement;
    orderStatusDescription: HTMLElement;
    orderStatusButton: HTMLButtonElement;
    render(totalSum: number): HTMLElement;
  }
  
  export class OrderStatus implements IOrderStatus {
    orderStatusElement: HTMLElement;
    orderStatusDescription: HTMLElement;
    orderStatusButton: HTMLButtonElement;
  
    constructor(protected _events: IEvents) {
      this.orderStatusElement = cloneTemplate(document.getElementById('success') as HTMLTemplateElement);
      this.orderStatusDescription = this.orderStatusElement.querySelector('.order-success__description');
      this.orderStatusButton = this.orderStatusElement.querySelector('.order-success__close');
  
      this.orderStatusButton.addEventListener('click', () => { _events.emit(AppEvents.STATUS_CLOSE) });
    }
  
    render(total: number) {
      this.orderStatusDescription.textContent = String(`Списано ${total}${settings.CURRENCY_TEXT}`);
      return this.orderStatusElement;
    }
  }