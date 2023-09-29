import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUmAddComponent } from './admin-um-add/admin-um-add.component';
import { AdminUmListingComponent } from './admin-um-listing/admin-um-listing.component';
import { AdminUmRoleAddComponent } from './admin-um-role-add/admin-um-role-add.component';
import { AdminUmRoleListComponent } from './admin-um-role-list/admin-um-role-list.component';

const routes: Routes = [
  { path: "", redirectTo: "user-list", pathMatch: "full" },
  { path: "user-list", component: AdminUmListingComponent, pathMatch: "full" },
  { path: "user-add", component: AdminUmAddComponent, pathMatch: "full" },
  { path: "user-edit/:id", component: AdminUmAddComponent, pathMatch: "full" },
  { path: "user-view/:id", component: AdminUmAddComponent, pathMatch: "full" },
  { path: "role-list", component: AdminUmRoleListComponent, pathMatch: "full" },
  { path: "role-add", component: AdminUmRoleAddComponent, pathMatch: "full" },
  { path: "role-edit/:id", component: AdminUmRoleAddComponent, pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUmRoutingModule { }
