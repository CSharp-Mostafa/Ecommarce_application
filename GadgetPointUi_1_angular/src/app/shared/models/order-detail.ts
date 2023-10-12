import { Product } from './product'; 
import { Order } from './order'; 

export class OrderDetail {
  constructor(
    public orderDetailId: number,
    public orderId: number,
    public order: Order, // Reference to Order
    public productId: number,
    public product: Product, // Reference to Product
    public quantity: number,
    public price: number
  ) {}
}
