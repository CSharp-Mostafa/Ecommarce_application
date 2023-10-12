import { Supplier } from './supplier'; 
import { Category } from './category';  
import { SubCategory } from './sub-category'; 
import { Brand } from './brand'; 
import { Product } from './product';
import { Inspection } from './inspection';

export class Requisition {
  constructor(
    public requisitionId: number,
    public supplierId: number,
    public supplier: Supplier, // Reference to Supplier
    public categoryId: number,
    public category: Category, // Reference to Category
    public subCategoryId: number,
    public subCategory: SubCategory, // Reference to SubCategory
    public brandId: number,
    public brand: Brand, // Reference to Brand
    public productId: number,
    public product: Product, // Reference to Product
    public quantity: number,
    public inspection: Inspection[] // Reference to Inspection array
  ) {}
}
