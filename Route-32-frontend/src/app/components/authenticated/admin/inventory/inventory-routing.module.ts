import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessInventoryComponent } from './business-inventory/business-inventory.component';
import { PurchaseOrderAddComponent } from './purchase-order-add/purchase-order-add.component';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { RetailerInventoryComponent } from './retailer-inventory/retailer-inventory.component';
import { RetailerRequestsListComponent } from './retailer-requests-list/retailer-requests-list.component';
import { StockInwardListComponent } from './stock-inward-list/stock-inward-list.component';
import { StockOutwardListComponent } from './stock-outward-list/stock-outward-list.component';

const routes: Routes = [
  { path: "", redirectTo: "purchase-order/list", pathMatch: "full" },
  { path: "purchase-order/list", component: PurchaseOrderListComponent, pathMatch: "full" },
  { path: "purchase-order/add", component: PurchaseOrderAddComponent, pathMatch: "full" },
  { path: "purchase-order/view/:id", component: PurchaseOrderAddComponent, pathMatch: "full" },
  { path: "business/list", component: BusinessInventoryComponent, pathMatch: "full" },
  { path: "retailer-wise/list", component: RetailerInventoryComponent, pathMatch: "full" },
  { path: "retailer-request/list", component: RetailerRequestsListComponent, pathMatch: "full" },
  { path: "stock-inward/list", component: StockInwardListComponent, pathMatch: "full" },
  { path: "stock-outward/list", component: StockOutwardListComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
