# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Общая концепция
Приложение покупки товаров на основе паттерна MVP через событийно-ориентированный подход. "Общение" между моделями и отображениями осуществляется через централизованный брокер событий. 

## Описание базовых классов, их предназначение и функции

### Типы данных

 - Интерфейс ```IProduct``` описывает объект товара. В нем содержатся поля с данными по товару, полученные от сервера + признак наличия товара в корзине

    ```
    export interface IProduct {
        id: string;
        title: string;
        description: string;
        category: string;
        price: number | null;
        image: string;
        inBasket: boolean;
    }

    ```

 - Покупатель - описывается интерфейсом ```ICustomer```. В нем указана контактная информация покупателя: телефон, электронная почта и адрес. Изначально эти данные неизвестны, при создании класса поля будут = пустым строкам, по мере заполнения данных в формах объект Customer будет обновляться пользовательскими данными по средством методов  setContacts (с формы указания контактов) и setAddress (с формы выбора доставки)

    ```
    export interface ICustomer {
        phone: string;
        email: string;
        address?: string;
    }
    ```

 - Корзина описывается интерфейсом ```IBasket```. В ней содержаться данные списка товаров, которые добавлены в корзину и общая сумма за товары. У Корзины есть методы:
    * addProduct - для добавления товара в корзину,
    * deleteProduct - удаление товара из корзины,
    * clearBasket - метод очистыки корзины (нужен для того, чтобы очистить корзину после оформления заказа)

    ```
    export interface IBasket {
        items: IProduct[];
        total: number;

        addProduct(product: IProduct): void;
        deleteProduct(productId: string): void;
        clearBasket(): void;
    }
    ```

 - Заказ - описывается интерфейсом ```IOrder```. Заказ наполняется данными из объектов корзины, покупателя и выбранного типа оплаты

    ```
    interface IOrder {
        items: IProduct[];
        address: string;
        email: string;
        phone: string;
        payment: TPayment;
        total: number;
    }   
    ```

 Отдельно выделены типы оплаты, доставки и статуса заказа.
 - Тип оплаты может быть онлайн (картой) или при получении (наличными). Тип описан в ```TPayment```.

    ```
    type TPayment = 'online' | 'cash';
    ```

 - Статус заказа требуется для отслеживания на каком этапе оформления находится заказ. Выделено 4 статуса: в корзине, выбор способов оплаты и доставки, заполнение контактов и, финальный - заказ оформлен. Сущность описана в ```TOrderStatus```.

    ```
    type TOrderStatus = 'basket' | 'payment' | 'contacts' | 'ordered';
    ```

 - Для описания типов событий я приложении использован ```enum AppEvents```

    ```
    export enum AppEvents {
        CATALOG_ONLOAD = 'catalog:onload', //загрузка товаров в каталог при загрузке страницы
        CATALOG_UPDATE = 'catalog:update', //изменение в списке товаров в каталоге
        MODAL_OPEN = 'modal:open', //открытие модального окна
        BASKET_UPDATE = 'basket:update', //обновление корзины
        BASKET_CLEAR = 'basket:clear', //очистка корзины
        ORDER_UPDATE = 'order:update', //обновление заказа
        ORDER_CONFIRM = 'order:confirm', //подтверждение заказа
        ORDER_CLEAR = 'order:clear' //очистка данных заказа
    }
    ```   

- Состояние приложения описывается интерфейсом ```IAppState```. Изначально данные заполнены дефолтными значениями
Например, корзина пустая, контакты неизвестны, тип опланы онлайн. По мере взаимодействия с интерфейсом значения в полях будут меняться 

    ```
    export interface IAppState {
        catalog: IProduct[];
        basket: IProduct[];
        order: IOrder;
        customerInfo: ICustomer;
        delivery: TDelivery;
        payment: TPayment;
    }
    ```

Класс состояния приложения:
    ```
    abstract class AppState implements IAppState {
	order: IOrder;
	customerInfo: ICustomer;
	delivery: string;
	payment: TPayment;
	catalog: IProduct[];
	basket: IProduct[];

	constructor(order: IOrder, customerInfo:ICustomer, delivery: string, payment: TPayment, catalog: IProduct[], basket: IProduct[]) {
            this.order = order;
            this.customerInfo = customerInfo;
            this.delivery = delivery;
            this.payment = payment;
            this.basket	= basket;
        }
	
    }
    ```

- Взаимодействие с сервером описано с помощью интерфейса ```ILarekApi```. В нем 3 метода: получение списка товаров для каталога, получение информации по товару по ID и создание заказа

    ```
    export interface ILarekApi {
            getProductsList: () => Promise<ICatalogProductListResult>;
            getProductData: (id: string) => Promise<IProduct>;
            createOrder: (confirmedOrder: IOrderConfirmed) => Promise<IOrderConfirmed>;
    }
    ```

- Интерфейс для класса отрисивки контента ```IView```
    ```
    export interface IView {
        element: HTMLElement;
        events: IEvents;
        render(args?: object): unknown;
    }
    ```


### Базовый класс брокера событий ```EventsEmitter```

    Обеспечивает взаимодействие между объектами приложения на основании событий. Использует типы ```Subscriber``` (Подписчик) и ```EmitterEvent``` (Событие). 
    Основные методы:
    - ```on``` установить обработчик на событие
    - ```off``` снять обработчик с события
    - ```emit``` инициировать событие с данными

    Описан в ```/components/base/events.ts```

    Типы событий приложения описаны в ```enum AppEvents```

### Модели данных
На основании описанных интерфейсов имплементируются классы с реализацией методов. Классы вынесены в отдельную директорию ```/components/model```

Выделены основные классы с моделями данных:
 - Продукт
 - Покупатель (контакты)
 - Корзина
 - Заказ
 - Состояние приложения
