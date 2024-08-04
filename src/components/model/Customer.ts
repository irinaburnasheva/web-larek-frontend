import { ICustomer } from "../../types";

export abstract class Customer implements ICustomer {
	contacts: {
		phone: string;
		email: string;
	}
	address?: string;

	protected _emptyData: {
		contacts: {
			phone: '';
			email: '';
		},
		address: '',
	}

	
	constructor() {
		this.contacts.phone = this._emptyData.contacts.phone;
		this.contacts.email = this._emptyData.contacts.email;
		this.address = this._emptyData.address;
	}

	get customerContacts() {
		return this.contacts;
	}

    set customerContacts(value: { phone: string, email: string }) {
        this.contacts.phone = value.phone;
		this.contacts.email = value.email;
    }

	get customerAddress() {
		return this.address;
	}

    set customerAddress(address: string) {
        this.address = address;
    }

	clearData() {
		this.customerContacts = this._emptyData.contacts;
		this.customerAddress = this._emptyData.address;
	}
}