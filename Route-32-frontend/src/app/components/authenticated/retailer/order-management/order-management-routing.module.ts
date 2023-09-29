import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: OrderListComponent, pathMatch: "full" },
  { path: "add", component: OrderAddComponent, pathMatch: "full" },
  { path: "view/:id", component: OrderAddComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
