import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessInventoryComponent } from './business-inventory/business-inventory.component';
import { InwardStockListComponent } from './inward-stock-list/inward-stock-list.component';
import { RecievedRequestListComponent } from './recieved-request-list/recieved-request-list.component';
import { RequestAdminAddComponent } from './request-admin-add/request-admin-add.component';
import { RequestAdminListComponent } from './request-admin-list/request-admin-list.component';

const routes: Routes = [
  { path: "", redirectTo: "business-inventory/list", pathMatch: "full" },
  { path: "business-inventory/list", component: BusinessInventoryComponent, pathMatch: "full" },
  { path: "request-admin/list", component: RequestAdminListComponent, pathMatch: "full" },
  { path: "request-admin/add", component: RequestAdminAddComponent, pathMatch: "full" },
  { path: "recieved-request/list", component: RecievedRequestListComponent, pathMatch: "full" },
  { path: "inward-stock/list", component: InwardStockListComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
