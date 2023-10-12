import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination'
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { AdminsidenavComponent } from './adminsidenav/adminsidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';

import { MainComponent } from './dashboard/main/main.component';
import { TopWidgetsComponent } from './dashboard/top-widgets/top-widgets.component';
import { SalesByMonthComponent } from './dashboard/sales-by-month/sales-by-month.component';
import { SalesByCategoryComponent } from './dashboard/sales-by-category/sales-by-category.component';
import { LastFewTransactionComponent } from './dashboard/last-few-transaction/last-few-transaction.component';
import { TopThreeProductsComponent } from './dashboard/top-three-products/top-three-products.component';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import { ChartModule } from 'angular-highcharts';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// import { BrandComponent } from '../components and services/brand/brand.component';



@NgModule({
  declarations: [ 
    // BrandComponent,
    PagingHeaderComponent, 
    PagerComponent, 
    DashboardComponent, 
    // AdminsidenavComponent
    // AppRoutingModule,
    MainComponent,
    TopWidgetsComponent,
    SalesByMonthComponent,
    SalesByCategoryComponent,
    LastFewTransactionComponent,
    TopThreeProductsComponent


  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    // AdminsidenavComponent
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ChartModule,

  ],
  exports:[
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent

  ]
})
export class SharedModule { }
