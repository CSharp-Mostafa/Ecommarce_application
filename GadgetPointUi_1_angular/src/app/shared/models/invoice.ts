import { Order } from './order'; // Import associated Order model

export class Invoice {
  constructor(
    public invoiceId: number,
    public invoiceDate: Date,
    public orderId: number,
    public order: Order, // Reference to Order
    public totalPrice: number
  ) {}
}
