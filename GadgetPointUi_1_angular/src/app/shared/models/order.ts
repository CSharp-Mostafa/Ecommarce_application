import { Customer } from './customer'; 
import { Payment } from './payment'; 
import { OrderDetail } from './order-detail'; 
import { Invoice} from './invoice'; 
import { PackAndDelivery } from './pack-and-delivery'; 

export class Order {
  constructor(
    public orderId: number,
    public customerId: number | null, // Use union type for nullable properties
    public customer: Customer | null, // Reference to Customer
    public customerType: string,
    public orderDate: Date,
    public shippingAddress: string,
    public paymentId: number,
    public payment: Payment, // Reference to Payment
    public orderDetail: OrderDetail[], // Reference to OrderDetail array
    public invoices: Invoice[], // Reference to Invoice array
    public packAndDelivery: PackAndDelivery[] // Reference to PackAndDelivery array
  ) {}
}
