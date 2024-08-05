import { AppEvents } from '../model/AppEvents';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export interface IModalView {
	modalContainer: HTMLElement;
	modalContentElement: HTMLElement;
	modalCloseButtonElement: HTMLButtonElement;

	show(): void;
	hide(): void;
	render(content: HTMLElement): HTMLElement;
}

export class Modal implements IModalView {
	modalContainer: HTMLElement;
	modalContentElement: HTMLElement;
	modalCloseButtonElement: HTMLButtonElement;
	protected _modalWrapper: HTMLElement;

	constructor(protected _events: IEvents) {
		this.modalContainer = ensureElement<HTMLElement>('#modal-container');
		this.modalContentElement = this.modalContainer.querySelector('.modal__content');
		this.modalCloseButtonElement = this.modalContainer.querySelector('.modal__close');
		this._modalWrapper = document.querySelector('.page__wrapper');

		document.addEventListener('click', (evt: MouseEvent) => {
			evt.stopPropagation();
			if (
				this.modalCloseButtonElement.contains(evt.target as HTMLElement) ||
				(evt.target as HTMLElement).classList.contains('modal_active')
			) { this.hide();}
		});
	}

	show() {
		this.modalContainer.classList.add('modal_active');
		this._events.emit(AppEvents.MODAL_SHOW);
	}

	hide() {
		this.modalContainer.classList.remove('modal_active');
		this._events.emit(AppEvents.MODAL_HIDE);
	}

	set isLocked(value: boolean) {
		this._modalWrapper.classList.toggle('page__wrapper_locked', value);
	}

	render(modalContent: HTMLElement): HTMLElement {
		this.modalContentElement.replaceChildren(modalContent);
		this.show();
		return this.modalContainer;
	}
}
