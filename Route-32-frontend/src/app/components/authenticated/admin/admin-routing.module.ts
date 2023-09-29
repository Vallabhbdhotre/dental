import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path: "", redirectTo: "dashboard", pathMatch: "full"},
  {path: "dashboard", loadChildren: () => import('../admin/admin-dashboard/admin-dashboard.module').then(
    (m) => m.AdminDashboardModule
  )},
  {
    path: "um", loadChildren: () => import('../admin/admin-um/admin-um.module').then(
      (m) => m.AdminUmModule
    )
  },
  {
    path: "onboarding", loadChildren: () => import('../admin/retailer-onboarding/retailer-onboarding.module').then(
      (m) => m.RetailerOnboardingModule
    )
  },
  {
    path: "master", loadChildren: () => import('../admin/master-table/master-table.module').then(
      (m) => m.MasterTableModule
    )
  },
  {
    path: "order-management", loadChildren: () => import('../admin/order-management/order-management.module').then(
      (m) => m.OrderManagementModule
    )
  },
  {
    path: "transaction", loadChildren: () => import('../admin/transaction/transaction.module').then(
      (m) => m.TransactionModule
    )
  },
  {
    path: "category", loadChildren: () => import('../admin/category/category.module').then(
      (m) => m.CategoryModule
    )
  },
  {
    path: "report", loadChildren: () => import('../admin/report/report.module').then(
      (m) => m.ReportModule
    )
  },
  {
    path: "product", loadChildren: () => import('../admin/product/product.module').then(
      (m) => m.ProductModule
    )
  },
  {
    path: "inventory", loadChildren: () => import('../admin/inventory/inventory.module').then(
      (m) => m.InventoryModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
