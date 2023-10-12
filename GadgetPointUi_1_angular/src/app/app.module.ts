import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components and services/brand/brand.component';
import { CategoryComponent } from './components and services/category/category.component';
import { CustomerComponent } from './components and services/customer/customer.component';
import { InspectionComponent } from './components and services/inspection/inspection.component';
import { InvoiceComponent } from './components and services/invoice/invoice.component';
import { OrderComponent } from './components and services/order/order.component';
import { OrderDetailComponent } from './components and services/order-detail/order-detail.component';
import { PackAndDeliveryComponent } from './components and services/pack-and-delivery/pack-and-delivery.component';
import { PaymentComponent } from './components and services/payment/payment.component';
import { ProductComponent } from './components and services/product/product.component';
import { RequisitionComponent } from './components and services/requisition/requisition.component';
import { ReturnComponent } from './components and services/return/return.component';
import { StockComponent } from './components and services/stock/stock.component';
import { SupplierComponent } from './components and services/supplier/supplier.component';
import { SubCategoryComponent } from './components and services/sub-category/sub-category.component';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandService } from './components and services/brand/brand.service';
import { SharedService } from './shared/shared.service';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { SectionHeaderComponent } from './core/section-header/section-header.component';
// import { NavBarComponent } from './core/nav-bar/nav-bar.component';

import { MatButtonModule } from '@angular/material/button';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { ButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// import { DataTablesModule } from 'angular-datatables';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
// import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductAddEditComponent } from './components and services/product-add-edit/product-add-edit.component';
import { BasketComponent } from './components and services/basket/basket.component';
import { NotFoundComponent } from './components and services/not-found/not-found.component';
import { AdminsidenavComponent } from './shared/adminsidenav/adminsidenav.component';

  
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CategoryComponent,
    CustomerComponent,
    InspectionComponent,
    InvoiceComponent,
    OrderComponent,
    OrderDetailComponent,
    PackAndDeliveryComponent,
    PaymentComponent,
    ProductComponent,
    RequisitionComponent,
    ReturnComponent,
    StockComponent,
    SupplierComponent,
    SubCategoryComponent,
    ProductAddEditComponent,
    BasketComponent,
    NotFoundComponent,
    AdminsidenavComponent,
     
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    BrowserAnimationsModule,
    CoreModule,
    // ShopModule,
    // DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,

    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
// MatToolbarModule
// SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent ]
})
export class AppModule { }
