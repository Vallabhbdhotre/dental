import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { PurchaseOrderAddComponent } from './purchase-order-add/purchase-order-add.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BusinessInventoryComponent } from './business-inventory/business-inventory.component';
import { RetailerInventoryComponent } from './retailer-inventory/retailer-inventory.component';
import { RetailerRequestsListComponent } from './retailer-requests-list/retailer-requests-list.component';
import { StockInwardListComponent } from './stock-inward-list/stock-inward-list.component';
import { StockOutwardListComponent } from './stock-outward-list/stock-outward-list.component';


@NgModule({
  declarations: [
    PurchaseOrderListComponent,
    PurchaseOrderAddComponent,
    BusinessInventoryComponent,
    RetailerInventoryComponent,
    RetailerRequestsListComponent,
    StockInwardListComponent,
    StockOutwardListComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule
  ]
})
export class InventoryModule { }
