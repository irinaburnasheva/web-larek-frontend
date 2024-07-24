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

## Описание базовых классов, их предназначение и функции

### Типы данных

 - Товар - описывается интерфейсом ```IProduct```. В нем содержатся поля: идентификатор, наименование, описание, категория товара, изображение и цена.

    ```
    interface IProduct {
        id: string;
        name: string;
        description: string;
        category: string;
        price: number | null;
        image: string;
    }
    ```

 - Покупатель - описывается интерфейсом ```ICustomer```. В нем указана контактная информация покупателя: телефон, электронная почта и адрес.

    ```
    interface ICustomer {
        phone: string;
        mail: string;
        address: string;
    }
    ```

 - Заказ - описывается интерфейсом ```IOrder```. У заказа представлены поля: идентификатор, список выбранных товаров, покупатель, тип оплаты, тип доставки, итоговая сумма и статус заказа.

    ```
    interface IOrder {
        id: string;
        products: IProduct[];
        customer: ICustomer;
        payment: TPayment;
        delivery: TDelivery;
        totalSum: number;
        status: TOrderStatus;
    }
    ```

 Отдельно выделены типы оплаты, доставки и статуса заказа.
 - Тип оплаты может быть онлайн (картой) или при получении (наличными). Тип описан в ```TPayment```.

    ```
    type TPayment = 'card' | 'cash';
    ```
 - Тип доставки предполагается либо курьерская доставка либо самовывоз и описан в ```TDelivery```.

    ```
    type TDelivery = 'pickup' | 'delivery';
    ```
 - Статус заказа требуется для отслеживания на каком этапе оформления находится заказ. Выделено 4 статуса: в корзине, выбор способов оплаты и доставки, заполнение контактов и, финальный - заказ оформлен. Сущность описана в ```TOrderStatus```.
 
    ```
    type TOrderStatus = 'basket' | 'payment' | 'contacts' | 'ordered';
    ```

### Модели данных

### Компоненты

