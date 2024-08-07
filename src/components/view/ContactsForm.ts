import { cloneTemplate } from "../../utils/utils";
import { IEvents } from "../base/events";
import { AppEvents } from "../model/AppEvents";

export interface IContactsForm {
    contactsFormElement: HTMLFormElement;
    inputEmailElement: HTMLInputElement;
    inputPhoneElement: HTMLInputElement;
    submitButtonElement: HTMLButtonElement;
    errorElement: HTMLElement;
    isValid(status : boolean): void;
    render(): HTMLElement;
}

export class ContactsForm implements IContactsForm {
    contactsFormElement: HTMLFormElement;
    inputEmailElement: HTMLInputElement;
    inputPhoneElement: HTMLInputElement;
    submitButtonElement: HTMLButtonElement;
    errorElement: HTMLElement;

    constructor(protected _events: IEvents) {
        this.contactsFormElement = cloneTemplate(document.getElementById('contacts') as HTMLTemplateElement);
        this.inputEmailElement = this.contactsFormElement.querySelector('input[name="email"]');
        this.inputPhoneElement = this.contactsFormElement.querySelector('input[name="phone"]');
        this.submitButtonElement = this.contactsFormElement.querySelector('.button');
        this.errorElement = this.contactsFormElement.querySelector('.form__errors');

        this.inputEmailElement.addEventListener('input', () => {
            this._events.emit(AppEvents.CONTACTS_FORM_UPDATE);
        });
        this.inputPhoneElement.addEventListener('input', () => {
            this._events.emit(AppEvents.CONTACTS_FORM_UPDATE);
        });

        this.contactsFormElement.addEventListener('submit', (evt: SubmitEvent) => {
            evt.preventDefault();
    
            this._events.emit(AppEvents.ORDER_CONFIRM);
          });
    }

    isValid(status: boolean) {
        this.submitButtonElement.disabled = !status;
    };

    render() {
        return this.contactsFormElement;
    };
}