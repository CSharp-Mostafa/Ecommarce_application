import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SubCategory } from 'src/app/shared/models/sub-category';
import { SubCategoryService } from './sub-category.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit, AfterViewInit  {
  subCategories: SubCategory[] = [];
  selectedSubCategory: SubCategory | undefined;
  newSubCategoryName: string = '';
  isEditing: boolean = false;

  dataSource = new MatTableDataSource<SubCategory>([]);
  displayedColumns: string[] = ['serialNumber', 'subCategoryName', 'action'];
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private subCategoryService: SubCategoryService) {}

  ngOnInit(): void {
    this.getSubCategories();
  }

  ngAfterViewInit(): void {
    // Initialize the paginator and sort after the view is ready
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getSubCategories(): void {
    this.subCategoryService.getSubCategory().subscribe((subCategories) => {
      console.log(subCategories); // Log the data to check if it's being fetched correctly
      this.subCategories = subCategories;
      this.updateDataSource();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateDataSource(): void {
    const currentPage = this.paginator.pageIndex;
    const itemsPerPage = this.paginator.pageSize;
    const startIndex = currentPage * itemsPerPage;
    this.subCategories.slice(startIndex, startIndex + itemsPerPage).forEach((subCategory, index) => {
      const adjustedIndex = startIndex + index + 1;
      (subCategory as any)['serialNumber'] = this.toRoman(adjustedIndex);
    });
    this.dataSource.data = this.subCategories;
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

  onSelectForEdit(subCategory: SubCategory): void {
    this.selectedSubCategory = { ...subCategory };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.selectedSubCategory = undefined;
    this.isEditing = false;
  }

  createSubCategory(): void {
    const newSubCategory: SubCategory = { subCategoryId: 0, subCategoryName: this.newSubCategoryName };
    this.subCategoryService.createSubCategory(newSubCategory).subscribe(createSubCategory => {
      this.subCategories.push(createSubCategory);
      this.selectedSubCategory = undefined;
      this.newSubCategoryName = '';
      this.getSubCategories();
    });
  }

  updateSubCategory(): void {
    if (this.selectedSubCategory) {
      this.subCategoryService.updateSubCategory(this.selectedSubCategory.subCategoryId, this.selectedSubCategory).subscribe(updateSubCategory => {
        const index = this.subCategories.findIndex(b => b.subCategoryId === updateSubCategory.subCategoryId);
        if (index !== -1) {
          this.subCategories[index] = updateSubCategory;
        }
        this.getSubCategories();
        this.selectedSubCategory = undefined;
      });
    }
  }

  deleteSubCategory(id: number): void {
    this.subCategoryService.deleteSubCategory(id).subscribe(() => {
      this.subCategories = this.subCategories.filter(b => b.subCategoryId !== id);
      this.selectedSubCategory = undefined;
      this.getSubCategories();
    });
  }
}
