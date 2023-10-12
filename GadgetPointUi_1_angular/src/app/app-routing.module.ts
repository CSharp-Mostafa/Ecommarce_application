import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandComponent } from './components and services/brand/brand.component';
import { SupplierComponent } from './components and services/supplier/supplier.component';
import { CategoryComponent } from './components and services/category/category.component';
import { ProductComponent } from './components and services/product/product.component';
import { SubCategoryComponent } from './components and services/sub-category/sub-category.component';
import { BasketComponent } from './components and services/basket/basket.component';
import { ShopComponent } from './shop/shop.component';
import { NotFoundComponent } from './components and services/not-found/not-found.component';
import { AdminsidenavComponent } from './shared/adminsidenav/adminsidenav.component';
import { MainComponent } from './shared/dashboard/main/main.component';


const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'header', component: HeaderComponent },
  {path: '', component:ShopComponent},
  { path: 'brand', component: BrandComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'product', component: ProductComponent },
  { path: 'subcategory', component: SubCategoryComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'sidenev', component: AdminsidenavComponent},
  { path: 'notfound', component: NotFoundComponent},
  { path: 'main', component: MainComponent },

  { path: '**', component: NotFoundComponent, pathMatch:'full'},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }