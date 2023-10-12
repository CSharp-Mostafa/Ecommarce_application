import { Injectable } from '@angular/core';
import { Basket, BasketItem, BasketTotals } from 'src/app/shared/models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basket: Basket = new Basket();

  constructor() { }
  

  getBasket(): Basket {
    return this.basket;
  }

  addItemToBasket(item: BasketItem): void {
    const existingItem = this.basket.items.find(x => x.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.basket.items.push(item);
    }

    this.calculateTotals();
  }

  updateItemQuantity(itemId: number, newQuantity: number): void {
    const itemToUpdate = this.basket.items.find(x => x.id === itemId);

    if (itemToUpdate) {
      itemToUpdate.quantity = newQuantity;
      this.calculateTotals();
    }
  }

  removeItemFromBasket(itemId: number): void {
    const itemIndex = this.basket.items.findIndex(x => x.id === itemId);

    if (itemIndex !== -1) {
      this.basket.items.splice(itemIndex, 1);
      this.calculateTotals();
    }
  }

  clearBasket(): void {
    this.basket = new Basket();
  }

  calculateTotals(): void {
    const subtotal = this.basket.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total = subtotal + this.basket.shippingPrice;
    
    const totals: BasketTotals = {
      shipping: this.basket.shippingPrice,
      subtotal,
      total
    };

    this.basket.totals = totals;
  }
}
