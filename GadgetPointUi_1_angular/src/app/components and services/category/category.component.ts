import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from './category.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit, AfterViewInit  {
  categories: Category[] = [];
  selectedCategory: Category | undefined;
  newCategoryName: string = '';
  isEditing: boolean = false;

  dataSource = new MatTableDataSource<Category>([]);
  displayedColumns: string[] = ['serialNumber', 'categoryName', 'action'];
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit(): void {
    // Initialize the paginator and sort after the view is ready
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCategories(): void {
    this.categoryService.getCategory().subscribe((categories) => {
      console.log(categories); // Log the data to check if it's being fetched correctly
      this.categories = categories;
      this.updateDataSource();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateDataSource(): void {
    const currentPage = this.paginator.pageIndex;
    const itemsPerPage = this.paginator.pageSize;
    const startIndex = currentPage * itemsPerPage;
    this.categories.slice(startIndex, startIndex + itemsPerPage).forEach((category, index) => {
      const adjustedIndex = startIndex + index + 1;
      (category as any)['serialNumber'] = this.toRoman(adjustedIndex);
    });
    this.dataSource.data = this.categories;
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

  onSelectForEdit(category: Category): void {
    this.selectedCategory = { ...category };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.selectedCategory = undefined;
    this.isEditing = false;
  }

  createCategory(): void {
    const newCategory: Category = { categoryId:0, categoryName: this.newCategoryName };
    this.categoryService.createCategory(newCategory).subscribe(createCategory => {
      this.categories.push(createCategory);
      this.selectedCategory = undefined;
      this.newCategoryName = '';
      this.getCategories();
    });
  }

  updateCategory(): void {
    if (this.selectedCategory) {
      this.categoryService.updateCategory(this.selectedCategory.categoryId, this.selectedCategory).subscribe(updateCategory => {
        const index = this.categories.findIndex(b => b.categoryId === updateCategory.categoryId);
        if (index !== -1) {
          this.categories[index] = updateCategory;
        }
        this.getCategories();
        this.selectedCategory = undefined;
      });
    }
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(b => b.categoryId !== id);
      this.selectedCategory = undefined;
      this.getCategories();
    });
  }
}
