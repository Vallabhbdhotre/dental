import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetailerDashboardRoutingModule } from './retailer-dashboard-routing.module';
import { RetailerDashboardComponent } from './retailer-dashboard/retailer-dashboard.component';


@NgModule({
  declarations: [
    RetailerDashboardComponent
  ],
  imports: [
    CommonModule,
    RetailerDashboardRoutingModule
  ]
})
export class RetailerDashboardModule { }
