import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core'; // Import ElementRef
import { Product } from 'src/app/shared/models/product';
import { ProductService } from './product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessagesService } from 'src/app/shared/messages.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../category/category.service';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { BrandService } from '../brand/brand.service';
import { Category } from 'src/app/shared/models/category';
import { SubCategory } from 'src/app/shared/models/sub-category';
import { Brand } from 'src/app/shared/models/brand';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  selectedProduct: Product | undefined;
  newProductName: string = '';
  newProductDescription: string = '';
  newProductPrice: number = 0;
  newProductImage: string = '';
  selectedCategoryId: number | undefined;
  selectedSubCategoryId: number | undefined;
  selectedBrandId: number | undefined;
  isEditing: boolean = false;
  selectedImageFile: File | undefined;
  categories: Category[] = [];
  subcategories: SubCategory[] = [];
  brands: Brand[] = [];

  dataSource = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = [
    'serialNumber',
    'productName',
    'description',
    'price',
    'productImage',
    'category',
    'subCategory',
    'brand',
    'action',
  ];
  pageSize = 5;

  bookForm!: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('fileInput') fileInput!: ElementRef; // Use ElementRef

  product$!: Observable<Product|null>;

  constructor(
    private _dialog: MatDialog,
    private productService: ProductService,
    private _messageService: MessagesService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private brandService: BrandService,
  ) {}

  ngOnInit() {
    this.getProducts();
    this.fetchCategories(); // Populate categories
    this.fetchSubCategories(); // Populate subcategories
    this.fetchBrands(); // Populate brands
    this.product$ = this.productService.product$;
  }


  // ... rest of your component ...

  fetchCategories() {
    this.categoryService.getCategory().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this._messageService.openSnackBar('Error: Unable to fetch categories', 'error');
      }
    );
  }

  fetchSubCategories() {
    this.subCategoryService.getSubCategory().subscribe(
      (data) => {
        this.subcategories = data;
      },
      (error) => {
        console.error('Error fetching subcategories:', error);
        this._messageService.openSnackBar('Error: Unable to fetch subcategories', 'error');
      }
    );
  }

  fetchBrands() {
    this.brandService.getBrands().subscribe(
      (data) => {
        this.brands = data;
      },
      (error) => {
        console.error('Error fetching brands:', error);
        this._messageService.openSnackBar('Error: Unable to fetch brands', 'error');
      }
    );
  }

  // ... rest of your component ...

  ngAfterViewInit(): void {
    // Initialize the paginator and sort after the view is ready
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProducts() {
    this.productService.getProductList().subscribe(
      (data) => {
        console.log('Data received:', data);
  
        if (data && Array.isArray(data.data)) {
          // Assuming the product data is inside a 'data' property in the response
          this.products = data.data.map((item: any) => ({
            productId: item.productId,
            productName: item.productName,
            description: item.description,
            price: item.price,
            productImage: item.productImage,
            categoryId: item.categoryId,
            subCategoryId: item.subCategoryId,
            brandId: item.brandId,
          }));
          this.updateDataSource();
        } else {
          console.error('Data is not in the expected format:', data);
          this._messageService.openSnackBar('Error: Data is not in the expected format', 'error');
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
        this._messageService.openSnackBar('Error: Unable to fetch products', 'error');
      }
    );
  }
  

  updateDataSource(): void {
    const currentPage = this.paginator.pageIndex;
    const itemsPerPage = this.paginator.pageSize;
    const startIndex = currentPage * itemsPerPage;

    this.dataSource.data = this.products.slice(startIndex, startIndex + itemsPerPage);
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((cat) => cat.categoryId === categoryId);
    return category ? category.categoryName : '';
  }

  

  getSubCategoryName(subCategoryId: number): string {
    const subcategory = this.subcategories.find((subcat) => subcat.subCategoryId === subCategoryId);
    return subcategory ? subcategory.subCategoryName : '';
  }

  getBrandName(brandId: number): string {
    const brand = this.brands.find((br) => br.brandId === brandId);
    return brand ? brand.brandName : '';
  }

  onSelectForEdit(product: Product): void {
    this.selectedProduct = { ...product };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.selectedProduct = undefined;
    this.isEditing = false;
  }

  createProduct(): void {
    if (
      this.selectedCategoryId === undefined ||
      this.selectedSubCategoryId === undefined ||
      this.selectedBrandId === undefined
    ) {
      console.error('Category, subcategory, or brand is undefined');
      return;
    }

    const formData = new FormData();
    formData.append('ProductName', this.newProductName);
    formData.append('Description', this.newProductDescription);
    formData.append('Price', this.newProductPrice.toString());
    formData.append('CategoryId', this.selectedCategoryId.toString());
    formData.append('SubCategoryId', this.selectedSubCategoryId.toString());
    formData.append('BrandId', this.selectedBrandId.toString());
    formData.append('IsActive', 'true'); // You can set the default value here

    const productImgInput = this.fileInput.nativeElement;
    if (productImgInput.files && productImgInput.files.length > 0) {
      formData.append('ImageFile', productImgInput.files[0]);
    }

    this.productService.addProduct(formData).subscribe(
      (createdProduct) => {
        this.products.push(createdProduct);
        this.selectedProduct = undefined;
        this.newProductName = '';
        this.newProductDescription = '';
        this.newProductPrice = 0;
        this.newProductImage = '';
        this.selectedCategoryId = undefined;
        this.selectedSubCategoryId = undefined;
        this.selectedBrandId = undefined;
        this.getProducts();
        this._messageService.openSnackBar('Product created!', 'done');
      },
      (error) => {
        console.error('Error creating product:', error);
        // Handle errors here if needed
      }
    );
  }

  updateProduct(): void {
    if (this.selectedProduct) {
      const formData = new FormData();
      formData.append('productName', this.selectedProduct.productName);
      formData.append('description', this.selectedProduct.description);
      formData.append('price', this.selectedProduct.price.toString());
  
      // Use 'category' instead of 'categoryId'
      formData.append('category', this.selectedProduct.category);
  
      // Use 'subCategory' instead of 'subCategoryId'
      formData.append('subCategory', this.selectedProduct.subCategory);
  
      // Use 'brand' instead of 'brandId'
      formData.append('brand', this.selectedProduct.brand);
  
      if (this.selectedImageFile) {
        formData.append('updatedImage', this.selectedImageFile);
      }
  
      this.productService.updateProduct(this.selectedProduct.productId, formData).subscribe(
        (updatedProduct) => {
          const index = this.products.findIndex((p) => p.productId === updatedProduct.productId);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.getProducts();
          this.selectedProduct = undefined;
        },
        (error) => {
          console.error('Error updating product:', error);
          // Handle errors here if needed
        }
      );
    }
  }
  

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter((p) => p.productId !== id);
        this.selectedProduct = undefined;
        this._messageService.openSnackBar('Product deleted!', 'done');
        this.getProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
        // Handle errors here if needed
      }
    );
  }

  calculateRomanNumeral(index: number): string {
    const currentPage = this.paginator.pageIndex;
    const itemsPerPage = this.paginator.pageSize;
    const adjustedIndex = currentPage * itemsPerPage + index + 1;
    return this.toRoman(adjustedIndex);
  }

  toRoman(num: number): string {
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV'];
    return num >= 1 && num <= romanNumerals.length ? romanNumerals[num - 1] : '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.selectedProduct) {
          this.selectedProduct.productImage = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }


}
