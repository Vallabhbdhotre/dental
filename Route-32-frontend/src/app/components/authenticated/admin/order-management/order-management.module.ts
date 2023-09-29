import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRoutingModule } from './order-management-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderViewComponent
  ],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class OrderManagementModule { }
