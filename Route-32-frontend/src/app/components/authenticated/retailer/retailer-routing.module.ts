import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailerDashboardComponent } from './retailer-dashboard/retailer-dashboard/retailer-dashboard.component';
import { TempPasswordComponent } from './temp-password/temp-password.component';

const routes: Routes = [
  {path: "", redirectTo: "dashboard", pathMatch: "full"},
  {
    path: "dashboard", loadChildren: () => import('../retailer/retailer-dashboard/retailer-dashboard.module').then(
      (m) => m.RetailerDashboardModule
    )
  },
  {
    path: "order-management", loadChildren: () => import('../retailer/order-management/order-management.module').then(
      (m) => m.OrderManagementModule
    )
  },
  {
    path: "um", loadChildren: () => import('../retailer/retailer-um/retailer-um.module').then(
      (m) => m.RetailerUmModule
    )
  },
  { path: "sub-retailer-onboarding", loadChildren: () => import('../retailer/sub-retailer-onboarding/sub-retailer-onboarding.module').then(
      (m) => m.SubRetailerOnboardingModule
    )
  },
  {
    path: "inventory", loadChildren: () => import('../retailer/inventory/inventory.module').then(
    (m) => m.InventoryModule
    )
  },
  { path: "temp-password", component: TempPasswordComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerRoutingModule { }
