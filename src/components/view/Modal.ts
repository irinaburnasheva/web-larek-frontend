import { AppEvents } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export interface IModalView {
    modalContentElement: HTMLElement;
    modalCloseButtonElement: HTMLButtonElement;

    show(): void;
    hide(): void;
    render(content: HTMLElement): HTMLElement;
}

export class Modal implements IModalView {
    modalContentElement: HTMLElement;
    modalCloseButtonElement: HTMLButtonElement;
    modalContainer: HTMLElement; 

    constructor(protected _events: IEvents) {
        this.modalContainer = ensureElement<HTMLElement>('#modal-container');
        this.modalContentElement = this.modalContainer.querySelector('.modal__content');
        this.modalCloseButtonElement = this.modalContainer.querySelector('.modal__close');
    }

    show(){
        this.modalContainer.classList.add('modal_active');
        this._events.emit(AppEvents.MODAL_SHOW);
    }

    hide(){
        this.modalContainer.classList.remove('modal_active');
        this._events.emit(AppEvents.MODAL_HIDE);
    }

    render(content: HTMLElement): HTMLElement {
        this.modalContentElement.replaceChildren(content);
        this.show();
        return this.modalContainer;
        console.log(this.modalContainer);
    }
}