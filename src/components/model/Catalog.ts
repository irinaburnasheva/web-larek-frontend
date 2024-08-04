import { AppEvents, IProduct } from "../../types";
import { IEvents } from "../base/events";

export interface ICatalog {
  productCardList: IProduct[];
  selectedСard: IProduct;
  previewCard(item: IProduct): void;
}

export class Catalog implements ICatalog {
  productCardList: IProduct[];
  selectedСard: IProduct;

  constructor(protected _events: IEvents) {
    this.productCardList = [];
  }

  get productsList() {
    return this.productCardList;
  }

  set productsList(products: IProduct[]) {
    this.productCardList = products;
    this._events.emit(AppEvents.CATALOG_ONLOAD);
  }

  previewCard(product: IProduct) {
    this.selectedСard = product;
    this._events.emit(AppEvents.MODAL_SHOW, product);
  }
}