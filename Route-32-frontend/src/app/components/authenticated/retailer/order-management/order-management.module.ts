import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRoutingModule } from './order-management-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderAddComponent
  ],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    MatPaginatorModule
  ]
})
export class OrderManagementModule { }
