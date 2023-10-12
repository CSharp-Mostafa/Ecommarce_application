import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Brand } from 'src/app/shared/models/brand';
import { BrandService } from './brand.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit, AfterViewInit  {
  brands: Brand[] = [];
  selectedBrand: Brand | undefined;
  newBrandName: string = '';
  isEditing: boolean = false;

  totalBrands: number = 0; // Initialize totalBrands property

  dataSource = new MatTableDataSource<Brand>([]);
  displayedColumns: string[] = ['serialNumber', 'brandName', 'action'];
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrands();
    this.getTotalBrands(); // Call the new function
  }

  ngAfterViewInit(): void {
    // Initialize the paginator and sort after the view is ready
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getBrands(): void {
    this.brandService.getBrands().subscribe((brands) => {
      console.log(brands); // Log the data to check if it's being fetched correctly
      this.brands = brands;
      this.updateDataSource();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateDataSource(): void {
    const currentPage = this.paginator.pageIndex;
    const itemsPerPage = this.paginator.pageSize;
    const startIndex = currentPage * itemsPerPage;
    this.brands.slice(startIndex, startIndex + itemsPerPage).forEach((brand, index) => {
      const adjustedIndex = startIndex + index + 1;
      (brand as any)['serialNumber'] = this.toRoman(adjustedIndex);
    });
    this.dataSource.data = this.brands;
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



  onSelectForEdit(brand: Brand): void {
    this.selectedBrand = { ...brand };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.selectedBrand = undefined;
    this.isEditing = false;
  }

  createBrand(): void {
    const newBrand: Brand = { brandId: 0, brandName: this.newBrandName };
    this.brandService.createBrand(newBrand).subscribe(createdBrand => {
      this.brands.push(createdBrand);
      this.selectedBrand = undefined;
      this.newBrandName = '';
      this.getBrands();
    });
  }

  updateBrand(): void {
    if (this.selectedBrand) {
      this.brandService.updateBrand(this.selectedBrand.brandId, this.selectedBrand).subscribe(updatedBrand => {
        const index = this.brands.findIndex(b => b.brandId === updatedBrand.brandId);
        if (index !== -1) {
          this.brands[index] = updatedBrand;
        }
        this.getBrands();
        this.selectedBrand = undefined;
      });
    }
  }

  deleteBrand(id: number): void {
    this.brandService.deleteBrand(id).subscribe(() => {
      this.brands = this.brands.filter(b => b.brandId !== id);
      this.selectedBrand = undefined;
      this.getBrands();
    });
  }

  getTotalBrands(): void {
    this.brandService.getTotalBrands().subscribe((total) => {
      this.totalBrands = total;
    });
  }


  getSupplierHTMLReport(brandName: string) {
    this.brandService.GenerateSupplierAllPDF().subscribe(response => {
      const blob: Blob = response;
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.download = brandName +'BrandReport.pdf'
      a.href = url;
      a.click();
  
      // Clean up the object URL
      window.URL.revokeObjectURL(url);
    });
  }
}