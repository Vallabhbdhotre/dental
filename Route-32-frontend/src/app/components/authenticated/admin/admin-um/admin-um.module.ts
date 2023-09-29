import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminUmRoutingModule } from './admin-um-routing.module';
import { AdminUmListingComponent } from './admin-um-listing/admin-um-listing.component';
import { AdminUmAddComponent } from './admin-um-add/admin-um-add.component';
import { AdminUmRoleListComponent } from './admin-um-role-list/admin-um-role-list.component';
import { AdminUmRoleAddComponent } from './admin-um-role-add/admin-um-role-add.component';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgToggleModule } from 'ng-toggle-button';


@NgModule({
  declarations: [
    AdminUmListingComponent,
    AdminUmAddComponent,
    AdminUmRoleListComponent,
    AdminUmRoleAddComponent
  ],
  imports: [
    CommonModule,
    AdminUmRoutingModule,
    MatSelectModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSlideToggleModule,
    FormsModule,
    NgToggleModule.forRoot()
  ]
})
export class AdminUmModule { }
