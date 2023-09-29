import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { NgToggleModule } from 'ng-toggle-button';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    NgToggleModule.forRoot()
  ]
})
export class ProductModule { }
