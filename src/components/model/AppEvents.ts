import { IProduct } from "../../types";


export interface IAppEvents {
    onClick?: (event: MouseEvent) => void;
    onKeydown?: (event: KeyboardEvent) => void;
    onSubmit?: (event: SubmitEvent ) => void;
	onInput?: (event: InputEvent) => void;
    onChange?: (event: FormDataEvent) => void;
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
    ORDER_FORM_SHOW = 'orderForm:show',
    CONTACTS_FORM_SHOW = 'contactsForm:show',
    ORDER_CONFIRM = 'order:confirm',
    ORDER_CLEAR = 'order:clear',
    STATUS_CLOSE = 'orderStatus:close',
    ORDER_FORM_UPDATE = 'form:update',
    CONTACTS_FORM_UPDATE = 'form:update',
}