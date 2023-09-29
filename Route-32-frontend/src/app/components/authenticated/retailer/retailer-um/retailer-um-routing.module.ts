import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailerRoleAddComponent } from './retailer-role-add/retailer-role-add.component';
import { RetailerRoleListComponent } from './retailer-role-list/retailer-role-list.component';
import { RetailerUmAddComponent } from './retailer-um-add/retailer-um-add.component';
import { RetailerUmListComponent } from './retailer-um-list/retailer-um-list.component';

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: RetailerUmListComponent, pathMatch: "full" },
  { path: "add", component: RetailerUmAddComponent, pathMatch: "full" },
  { path: "user-edit/:id", component: RetailerUmAddComponent, pathMatch: "full" },
  { path: "user-view/:id", component: RetailerUmAddComponent, pathMatch: "full" },
  { path: "role-list", component: RetailerRoleListComponent, pathMatch: "full" },
  { path: "role-add", component: RetailerRoleAddComponent, pathMatch: "full" },
  { path: "role-edit/:id", component: RetailerRoleAddComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerUmRoutingModule { }
