import { Order } from './order'; 
import { Invoice } from './invoice'; 

export class Return {
  constructor(
    public returnId: number,
    public invoiceId: number,
    public invoice: Invoice, // Reference to Invoice
    public orderId: number,
    public order: Order, // Reference to Order
    public returnReason: string
  ) {}
}
