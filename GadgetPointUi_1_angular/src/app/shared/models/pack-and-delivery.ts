import { Order } from './order'; 

export class PackAndDelivery {
  constructor(
    public packAndDeliveryId: number,
    public deliveryStatus: string,
    public orderId: number | null, // Use union type for nullable properties
    public order: Order | null // Reference to Order
  ) {}
}
