import { Order } from './order'; 

export class Payment {
  constructor(
    public paymentId: number,
    public paymentMethod: string,
    public orders: Order[] // Reference to Order array
  ) {}
}
