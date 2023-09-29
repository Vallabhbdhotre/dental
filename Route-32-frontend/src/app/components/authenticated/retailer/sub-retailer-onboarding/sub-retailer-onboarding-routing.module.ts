import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubRetailerAddComponent } from './sub-retailer-add/sub-retailer-add.component';
import { SubRetailerListComponent } from './sub-retailer-list/sub-retailer-list.component';

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: SubRetailerListComponent, pathMatch: "full" },
  { path: "add", component: SubRetailerAddComponent, pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubRetailerOnboardingRoutingModule { }
