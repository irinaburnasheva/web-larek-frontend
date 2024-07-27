import { IEvents } from '../base/events';

export abstract class View {
    element: HTMLElement;
    events: IEvents;

    constructor(element: HTMLElement, events: IEvents) {
		this.element = element;
		this.events = events;
	}

    render() {
		//реализация
	}
}