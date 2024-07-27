import { ICustomer } from "../../types";

export abstract class Customer implements ICustomer {
	phone: string;
	email: string;
	address?: string;

	constructor(data: ICustomer) {
		this.phone = data.phone;
		this.email = data.email;
		this.address = data.address;
	}

    setContacs(phone: string, email: string){
        this.phone = phone;
        this.email = email;
    }

    setAddress(address: string) {
        this.address = address;
    }
}