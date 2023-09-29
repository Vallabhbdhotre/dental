import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetailerRoutingModule } from './retailer-routing.module';
import { TempPasswordComponent } from './temp-password/temp-password.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TempPasswordComponent
  ],
  imports: [
    CommonModule,
    RetailerRoutingModule,
    ReactiveFormsModule
  ]
})
export class RetailerModule { }
