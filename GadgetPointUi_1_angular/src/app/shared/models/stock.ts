import { Product } from './product'; 
import { Supplier } from './supplier';

export class Stock {
  constructor(
    public stockId: number,
    public purchaseDate: Date,
    public productId: number,
    public product: Product, // Reference to Product
    public supplierId: number,
    public supplier: Supplier, // Reference to Supplier
    public stockQuantity: number,
    public purchasePrice: number
  ) {}
}
