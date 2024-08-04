import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { AppApi } from './components/model/AppApi';
import { ProductCard } from './components/view/ProductCard';
import { AppEvents, IProduct } from './types'
import { Catalog } from './components/model/Catalog';
import { Basket } from './components/model/Basket';
import { ensureElement } from './utils/utils';
import { ProductCardModal } from './components/view/ProductCardModal';
import { Modal } from './components/view/Modal';


const appApi = new AppApi(CDN_URL, API_URL);
const eventBroker = new EventEmitter();
const catalog = new Catalog(eventBroker);
const basket = new Basket();
const modal = new Modal(eventBroker);


//Шаблоны HTML
const productCardCatalogTemplate = document.getElementById('card-catalog') as HTMLTemplateElement;
const productCardPreviewTemplate = document.getElementById('card-preview') as HTMLTemplateElement;

eventBroker.on(AppEvents.CATALOG_ONLOAD, () => {
    catalog.productsList.forEach(product => {
      const card = new ProductCard(productCardCatalogTemplate, eventBroker, { onClick: () => eventBroker.emit('card:select', product) });
      ensureElement<HTMLElement>('.gallery').append(card.render(product));
    });
});


eventBroker.on('card:select', (product: IProduct) => {catalog.previewCard(product) });


eventBroker.on(AppEvents.MODAL_SHOW, (product: IProduct) => {
  const cardPreview = new ProductCardModal(productCardPreviewTemplate, eventBroker)
  const modalContent = cardPreview.render(product);
  modal.render(modalContent);
});

// eventBroker.on

appApi.getProductsList()
  .then(function (data: IProduct[]) {
    catalog.productsList = data;
  })
  .catch(error => console.log(error))