import * as cuid from 'cuid';

export interface BasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface Basket {
    id: string;
    items: BasketItem[];
    clientSecret?: string;
    paymentIntentId?: string;
    deliveryMethodId?: number;
    shippingPrice: number;
    totals: BasketTotals; // Add this property
}

// export class Basket implements Basket {
//     id = cuid();
//     items: BasketItem[] = [];
//     shippingPrice = 0;
//   totals: BasketTotals;
// }

export class Basket implements Basket {
    id = cuid();
    items: BasketItem[] = [];
    shippingPrice = 0;
    totals: BasketTotals = {
      shipping: 0,
      subtotal: 0,
      total: 0,
    };
  }


export interface BasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
}