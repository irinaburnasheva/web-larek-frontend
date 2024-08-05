import { cloneTemplate } from "../../utils/utils";
import { IEvents } from "../base/events";

export interface IFormContacts {
    formContactsElement: HTMLFormElement;
    inputElements: HTMLInputElement[];
    submitButtonElement: HTMLButtonElement;
    errorElement: HTMLElement;
    render(): HTMLElement;
}

export class FormContscts implements IFormContacts {
    formContactsElement: HTMLFormElement;
    inputElements: HTMLInputElement[];
    submitButtonElement: HTMLButtonElement;
    errorElement: HTMLElement;

    constructor(protected _events: IEvents) {
        this.formContactsElement = cloneTemplate(document.getElementById('contacts') as HTMLTemplateElement);
        this.inputElements = Array.from(this.formContactsElement.querySelectorAll('.form__input'));
        this.submitButtonElement = this.formContactsElement.querySelector('.button');
        this.errorElement = this.errorElement.querySelector('.form__errors');
    }

    render(){
        return this.formContactsElement
    };
}