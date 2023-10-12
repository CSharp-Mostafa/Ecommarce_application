import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Supplier } from 'src/app/shared/models/supplier';
import { SupplierService } from './supplier.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MessagesService } from 'src/app/shared/messages.service';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit, AfterViewInit {
  suppliers: Supplier[] = [];
  selectedSupplier: Supplier | undefined;
  newSupplierName: string = '';
  newSupplierContactNo: string = ''; // Define newSupplierContactNo
  newSupplierEmail: string = '';     // Define newSupplierEmail
  newSupplierAddress: string = '';   // Define newSupplierAddress
  isEditing: boolean = false;
  //htmlReport: string;

  dataSource = new MatTableDataSource<Supplier>([]);
  displayedColumns: string[] = ['serialNumber', 'supplierName', 'contactNo', 'email', 'address', 'action'];
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private supplierService: SupplierService,
    private _messageService: MessagesService,
    
    
    ) { }

  ngOnInit(): void {
    this.getSuppliers();
   // this.getSupplierHTMLReportt();
  }

  ngAfterViewInit(): void {
    // Initialize the paginator and sort after the view is ready
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getSuppliers(): void {
    this.supplierService.getSuppliers().subscribe((suppliers) => {
      this.suppliers = suppliers;
      this.updateDataSource();
    });
  }

  updateDataSource(): void {
    const currentPage = this.paginator.pageIndex;
    const itemsPerPage = this.paginator.pageSize;
    const startIndex = currentPage * itemsPerPage;
    this.suppliers.slice(startIndex, startIndex + itemsPerPage).forEach((supplier, index) => {
      const adjustedIndex = startIndex + index + 1;
      (supplier as any)['serialNumber'] = adjustedIndex;
    });
    this.dataSource.data = this.suppliers;
  }

  onSelectForEdit(supplier: Supplier): void {
    this.selectedSupplier = { ...supplier };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.selectedSupplier = undefined;
    this.isEditing = false;
  }

  createSupplier(): void {
    const newSupplier: Supplier = {
      supplierId: 0,
      supplierName: this.newSupplierName,
      email: this.newSupplierEmail,         // Set default email value
      contactNo: this.newSupplierContactNo,      // Set default contactNo value as 0 (or any valid default number)
      address: this.newSupplierAddress,       // Set default address value
    };
  
    // this.supplierService.createSupplier(newSupplier).subscribe(createdSupplier => {
      this.supplierService.createSupplier(newSupplier).subscribe(createdSupplier => {
      this.suppliers.push(createdSupplier);
      this.selectedSupplier = undefined;
      this.newSupplierName = '';
      this.newSupplierEmail = '';
      this.newSupplierContactNo = '';
      this.newSupplierAddress = '';
      this.getSuppliers();
      this._messageService.openSnackBar('Supplier created!', 'done');
    });
  }

  updateSupplier(): void {
    if (this.selectedSupplier) {
      this.supplierService.updateSupplier(this.selectedSupplier.supplierId, this.selectedSupplier).subscribe(updatedSupplier => {
        const index = this.suppliers.findIndex(s => s.supplierId === updatedSupplier.supplierId);
        if (index !== -1) {
          this.suppliers[index] = updatedSupplier;
        }
        this.getSuppliers();
        this.selectedSupplier = undefined;
      });
    }
  }

  deleteSupplier(id: number): void {
    this.supplierService.deleteSupplier(id).subscribe(() => {
      this.suppliers = this.suppliers.filter(s => s.supplierId !== id);
      this.selectedSupplier = undefined;
      this._messageService.openSnackBar('Suppliers deleted!', 'done');

      this.getSuppliers();
    });
  }

  // Presentation logic from BrandComponent
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







  DownloadAllSupplier(supplierName: string) {
    this.supplierService.GenerateSupplierAllPDF().subscribe(response => {
      const blob: Blob = response;
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.download = supplierName + '_AllSuppliersInfo.pdf'; // Set the desired file name
      a.href = url;
      a.click();
  
      // Clean up the object URL
      window.URL.revokeObjectURL(url);
    });
  }


  
  getSupplierHTMLReport(supplierName: string) {
    this.supplierService.generateAllSuppliersHTMLReport().subscribe(response => {
      const blob: Blob = response;
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.download = supplierName +'SupplierReport.pdf'
      a.href = url;
      a.click();
  
      // Clean up the object URL
      window.URL.revokeObjectURL(url);
    });
  }


  
  // getSupplierHTMLReportt(): void {
  //   this.supplierService.generateAllSuppliersHTMLReport().subscribe(
  //     (htmlContent: string) => {
  //       this.htmlReport = htmlContent;
  //     },
  //     (error) => {
  //       console.error('Error fetching HTML report:', error);
  //     }
  //   );
  // }

}


