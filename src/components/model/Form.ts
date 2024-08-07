import { ICustomer, IOrder } from "../../types";
import { IEvents } from "../base/events";
import { AppEvents, IAppEvents } from "./AppEvents";
import { Order } from "./Order";

export interface IForm {
    validateOrderForm(payment: string, address: HTMLInputElement): { isValid: boolean; errorText: string };
    validateContactsForm(phone: string, email: string): { isValid: boolean; errorText: string };
  }

export class Form extends Order implements IForm {

    constructor(protected _events: IEvents){
        super(_events);
    }

    validateOrderForm(selectedPaymentType: string, addressInput: HTMLInputElement): { isValid: boolean; errorText: string } {
        if (selectedPaymentType.length === 0 && addressInput.value.trim().length === 0) {
            return {
                isValid: false,
                errorText: 'Выберите тип оплаты, Заполните адрес доставки'
            }
        }
        if(selectedPaymentType.length === 0) {
            return {
                isValid: false,
                errorText: 'Выберите тип оплаты'
            }
        }
        if(addressInput.value.trim().length === 0) {
            return {
                isValid: false,
                errorText: 'Заполните адрес доставки'
            }
        }
        return {
            isValid: true,
            errorText: ''
        }
    };

    validateContactsForm(email: string, phone: string): { isValid: boolean; errorText: string } {
        if (phone.trim().length === 0 && email.trim().length === 0) {
            return {
                isValid: false,
                errorText: 'Введите номер телефона, Введите адрес электронной почты'
            }
        }
        if(phone.trim().length === 0) {
            return {
                isValid: false,
                errorText: 'Введите номер телефона'
            }
        }
        if(email.trim().length === 0) {
            return {
                isValid: false,
                errorText: 'Введите адрес электронной почты'
            }
        }
        return {
            isValid: true,
            errorText: ''
        }
    };
}