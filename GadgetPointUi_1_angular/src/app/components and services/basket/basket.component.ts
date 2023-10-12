import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { Basket } from 'src/app/shared/models/basket';
import { BasketItem } from 'src/app/shared/models/basket';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  basket: Basket;
  newItem: BasketItem = {
    id: 1, // You should generate a unique ID for each item
    productName: 'Sample Product',
    price: 19.99,
    quantity: 1,
    pictureUrl: 'sample.jpg',
    brand: 'Sample Brand',
    type: 'Sample Type'
  };

  constructor(private basketService: BasketService) {
    this.basket = this.basketService.getBasket();
  }

  addItem(): void {
    this.basketService.addItemToBasket(this.newItem);
  }

  updateQuantity(itemId: number, newQuantity: number): void {
    this.basketService.updateItemQuantity(itemId, newQuantity);
  }

  removeItem(itemId: number): void {
    this.basketService.removeItemFromBasket(itemId);
  }

  clearBasket(): void {
    this.basketService.clearBasket();
  }
}
