import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "admin", loadChildren: () => import('../../authenticated/admin/admin.module').then(
      (m) => m.AdminModule
    )
  },
  {
    path: "retailer", loadChildren: () => import('../../authenticated/retailer/retailer.module').then(
      (m) => m.RetailerModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedLayoutRoutingModule { }
