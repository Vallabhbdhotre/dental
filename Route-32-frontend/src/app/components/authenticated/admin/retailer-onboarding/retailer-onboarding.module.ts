import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetailerOnboardingRoutingModule } from './retailer-onboarding-routing.module';
import { RetailerListComponent } from './retailer-list/retailer-list.component';
import { RetailerAddComponent } from './retailer-add/retailer-add.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgToggleModule } from 'ng-toggle-button';


@NgModule({
  declarations: [
    RetailerListComponent,
    RetailerAddComponent
  ],
  imports: [
    CommonModule,
    RetailerOnboardingRoutingModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
    NgToggleModule.forRoot()
  ]
})
export class RetailerOnboardingModule { }
