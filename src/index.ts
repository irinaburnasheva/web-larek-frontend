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


const appApi = new AppApi(CDN_URL, API_URL);
const eventBroker = new EventEmitter();
const modal = new Modal(eventBroker);
const catalog = new Catalog(eventBroker);
const basket = new Basket();
const order = new OrderForm(eventBroker);





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

function orderFormShowHandlet() {
    const orderFormContent = order.render();
    modal.render(orderFormContent);
}

eventBroker.on(AppEvents.CATALOG_ONLOAD, catalogOnLoadHandler);
eventBroker.on(AppEvents.PRODUCT_SELECT, selectProductCardHandler);
eventBroker.on(AppEvents.PRODUCT_PREVIEW_SHOW, productCardPreviewShowHandler);
eventBroker.on(AppEvents.MODAL_SHOW, () => modal.isLocked = true);
eventBroker.on(AppEvents.MODAL_HIDE, () => modal.isLocked = false);
eventBroker.on(AppEvents.PRODUCT_ADD_BASKET, addProductToBasketHandler);
eventBroker.on(AppEvents.BASKET_SHOW, renderBasketProductsHandler);
eventBroker.on(AppEvents.ODER_SHOW, orderFormShowHandlet);

appApi.getProductsList()
  .then(function (data: IProduct[]) {
    catalog.productsList = data;
  })
  .catch(error => console.log(error))