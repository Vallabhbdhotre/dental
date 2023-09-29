import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { RequestAdminListComponent } from './request-admin-list/request-admin-list.component';
import { RequestAdminAddComponent } from './request-admin-add/request-admin-add.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RecievedRequestListComponent } from './recieved-request-list/recieved-request-list.component';
import { BusinessInventoryComponent } from './business-inventory/business-inventory.component';
import { InwardStockListComponent } from './inward-stock-list/inward-stock-list.component';


@NgModule({
  declarations: [
    RequestAdminListComponent,
    RequestAdminAddComponent,
    RecievedRequestListComponent,
    BusinessInventoryComponent,
    InwardStockListComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class InventoryModule { }
