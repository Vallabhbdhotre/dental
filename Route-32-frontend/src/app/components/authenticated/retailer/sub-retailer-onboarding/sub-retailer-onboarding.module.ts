import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubRetailerOnboardingRoutingModule } from './sub-retailer-onboarding-routing.module';
import { SubRetailerListComponent } from './sub-retailer-list/sub-retailer-list.component';
import { SubRetailerAddComponent } from './sub-retailer-add/sub-retailer-add.component';


@NgModule({
  declarations: [
    SubRetailerListComponent,
    SubRetailerAddComponent
  ],
  imports: [
    CommonModule,
    SubRetailerOnboardingRoutingModule
  ]
})
export class SubRetailerOnboardingModule { }
