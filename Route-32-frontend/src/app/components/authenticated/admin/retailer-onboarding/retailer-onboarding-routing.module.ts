import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailerAddComponent } from './retailer-add/retailer-add.component';
import { RetailerListComponent } from './retailer-list/retailer-list.component';

const routes: Routes = [
  { path: "", redirectTo: "retailer-list", pathMatch: "full" },
  { path: "retailer-list", component: RetailerListComponent, pathMatch: "full" },
  { path: "retailer-add", component: RetailerAddComponent, pathMatch: "full" },
  { path: "retailer-edit/:id", component: RetailerAddComponent, pathMatch: "full" },
  { path: "retailer-view/:id", component: RetailerAddComponent, pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerOnboardingRoutingModule { }
