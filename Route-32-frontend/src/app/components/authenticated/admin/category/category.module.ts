import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgToggleModule } from 'ng-toggle-button';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryAddComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
    NgToggleModule.forRoot()
  ]
})
export class CategoryModule { }
