import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [NavBarComponent , SectionHeaderComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [NavBarComponent,SectionHeaderComponent,FooterComponent]
})
export class CoreModule { }
