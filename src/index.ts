import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { AppEvents } from './components/model/AppEvents';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { AppApi } from './components/model/AppApi';
import { ProductCard } from './components/view/ProductCard';
import { IProduct } from './types'
import { Catalog } from './components/model/Catalog';
import { Basket } from './components/model/Basket';
import { Basket as BasketView } from './components/view/Basket'
import { ensureElement } from './utils/utils';
import { ProductCardModal } from './components/view/ProductCardModal';
import { Modal } from './components/view/Modal';
import { BasketProduct } from './components/view/BasketProduct';
import { OrderForm } from './components/view/OrderForm';
import { Form } from './components/model/Form';
import { ContactsForm } from './components/view/ContactsForm';
import { Order } from './components/model/Order';
import { OrderStatus } from './components/view/OrderStatus';


const appApi = new AppApi(CDN_URL, API_URL);
const eventBroker = new EventEmitter();
const modal = new Modal(eventBroker);
const form = new Form(eventBroker);
const catalog = new Catalog(eventBroker);
const basket = new Basket();
const order = new OrderForm(eventBroker);
const contacts = new ContactsForm(eventBroker);
const orderConfirmed = new Order(eventBroker);


//Шаблоны HTML
const productCardCatalogTemplate = document.getElementById('card-catalog') as HTMLTemplateElement;
const productCardPreviewTemplate = document.getElementById('card-preview') as HTMLTemplateElement;
const basketTemplate = document.getElementById('basket') as HTMLTemplateElement;
const cardBasketTemplate = document.getElementById('card-basket') as HTMLTemplateElement;

const basketView = new BasketView(basketTemplate, eventBroker);


function renderBasketProductsHandler() {
    let i = 0;
    basketView.renderBasketProducts(basket.productsInBasket.map((product)=>{
        const basketItem = new BasketProduct(cardBasketTemplate, eventBroker, { onClick: () => deleteProductFromBasketHandler(product)});
        i++;
        return basketItem.render(product, i);
    }))
    basketView.renderTotalSum(basket.getTotalBasketSum());
    modal.render(basketView.render());
}

function deleteProductFromBasketHandler(product: IProduct) {
    basket.deleteProduct(product.id);
    basketView.renderHeaderBasketProductCounter(basket.getProductsCount());
    renderBasketProductsHandler();
};

function catalogOnLoadHandler() {
    catalog.productsList.forEach(product => {
        const card = new ProductCard(productCardCatalogTemplate, eventBroker, { onClick: () => eventBroker.emit(AppEvents.PRODUCT_SELECT, product) });
        ensureElement<HTMLElement>('.gallery').append(card.render(product));
      });
}
function selectProductCardHandler(product: IProduct) {
    catalog.previewCard(product);
}

function productCardPreviewShowHandler(product: IProduct) {
    const cardPreview = new ProductCardModal(productCardPreviewTemplate, eventBroker);
    const modalContentElement = cardPreview.render(product);
    modal.render(modalContentElement);
}

function addProductToBasketHandler() {
    basket.addProduct(catalog.selectedСard); 
    basketView.renderHeaderBasketProductCounter(basket.getProductsCount());
    modal.hide();
}

function orderFormShowHandler() {
    const orderFormContent = order.render();
    modal.render(orderFormContent);
}
function contactsFormShowHandler() {
    const contactsFormContent = contacts.render();
    modal.render(contactsFormContent);
}

function orderFormValidateHandler() {
    const payment = order.paymentTypeSelected;
    const address = order.addressInput;
    const validationResult = form.validateOrderForm(payment, address);
    order.errorElement.textContent = (validationResult.errorText);
    order.isValid(validationResult.isValid);
}

function contactsFormValidationHandler() {
    const email = contacts.inputEmailElement.value;
    const phone = contacts.inputPhoneElement.value;
    const validationResult = form.validateContactsForm(email, phone);
    contacts.errorElement.textContent = (validationResult.errorText);
    contacts.isValid(validationResult.isValid);
}

function orderConfirmHandler(){
    form.setItems(basket.productsInBasket.map(item => item.id));
    form.setTotal(basket.getTotalBasketSum());
    form.setPayment(order.paymentTypeSelected);
    form.setAddress(order.addressInput.value);
    form.setEmail(contacts.inputEmailElement.value);
    form.setPhone(contacts.inputPhoneElement.value);

    appApi.createOrder(form.orderData)
    .then((data) => {
      const orderStatus = new OrderStatus(eventBroker);
      basket.clearBasket();
      form.resetOrderData();
      basketView.renderHeaderBasketProductCounter(basket.getProductsCount());
      modal.render(orderStatus.render(data.total));
    })
    .catch(error => console.log(error));
}

eventBroker.on(AppEvents.CATALOG_ONLOAD, catalogOnLoadHandler);
eventBroker.on(AppEvents.PRODUCT_SELECT, selectProductCardHandler);
eventBroker.on(AppEvents.PRODUCT_PREVIEW_SHOW, productCardPreviewShowHandler);
eventBroker.on(AppEvents.MODAL_SHOW, () => modal.isLocked = true);
eventBroker.on(AppEvents.MODAL_HIDE, () => modal.isLocked = false);
eventBroker.on(AppEvents.PRODUCT_ADD_BASKET, addProductToBasketHandler);
eventBroker.on(AppEvents.BASKET_SHOW, renderBasketProductsHandler);
eventBroker.on(AppEvents.ORDER_FORM_SHOW, orderFormShowHandler);
eventBroker.on(AppEvents.CONTACTS_FORM_SHOW, contactsFormShowHandler);
eventBroker.on(AppEvents.ORDER_FORM_UPDATE, orderFormValidateHandler);
eventBroker.on(AppEvents.CONTACTS_FORM_UPDATE, contactsFormValidationHandler);
eventBroker.on(AppEvents.ORDER_CONFIRM, orderConfirmHandler);
eventBroker.on(AppEvents.STATUS_CLOSE, () => modal.hide());

appApi.getProductsList()
  .then(function (data: IProduct[]) {
    catalog.productsList = data;
  })
  .catch(error => console.log(error))