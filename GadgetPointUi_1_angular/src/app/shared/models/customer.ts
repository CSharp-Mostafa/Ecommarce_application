import { Order } from './order'; // Import associated Order and Invoice models
import { Invoice } from './invoice'; // Import associated Order and Invoice models


export class Customer {
  constructor(
    public customerId: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public contactNo: number,
    public address: string,
    public orders: Order[], // Reference to Order array
    public invoices: Invoice[] // Reference to Invoice array
  ) {}
}
