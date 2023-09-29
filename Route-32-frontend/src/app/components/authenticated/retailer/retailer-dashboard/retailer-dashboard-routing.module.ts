import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailerDashboardComponent } from './retailer-dashboard/retailer-dashboard.component';

const routes: Routes = [
  { path: "", component: RetailerDashboardComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerDashboardRoutingModule { }
