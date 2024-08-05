import { IProduct } from "../../types";


export interface IAppEvents {
    onClick?: (event: MouseEvent) => void;
    onKeydown?: (event: KeyboardEvent) => void;
}

//Типы событий в приложении
export enum AppEvents {
    CATALOG_ONLOAD = 'catalog:onload',
    MODAL_SHOW = 'modal:show',
    MODAL_HIDE = 'modal:hide',
    PRODUCT_SELECT = 'product:select',
    PRODUCT_PREVIEW_SHOW = 'productPreview:show',
    PRODUCT_ADD_BASKET = 'productPreview:addBasket',
    BASKET_SHOW = 'basket:show',
    BASKET_CLEAR = 'basket:clear',
    ODER_SHOW = 'orderForm:show',
    ORDER_PAYMENT_CHOICE = 'orderForm:paymentChoice',
    ORDER_ADDRESS_ADD = 'orderForm:addressAdd',
    CONTACTS_SHOW = 'contactsForm:show',
    ORDER_CONFIRM = 'order:confirm',
    ORDER_CLEAR = 'order:clear'
}