import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetailerUmRoutingModule } from './retailer-um-routing.module';
import { RetailerUmListComponent } from './retailer-um-list/retailer-um-list.component';
import { RetailerUmAddComponent } from './retailer-um-add/retailer-um-add.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RetailerRoleListComponent } from './retailer-role-list/retailer-role-list.component';
import { RetailerRoleAddComponent } from './retailer-role-add/retailer-role-add.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgToggleModule } from 'ng-toggle-button';


@NgModule({
  declarations: [
    RetailerUmListComponent,
    RetailerUmAddComponent,
    RetailerRoleListComponent,
    RetailerRoleAddComponent
  ],
  imports: [
    CommonModule,
    RetailerUmRoutingModule,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    FormsModule,
    NgToggleModule.forRoot()
  ]
})
export class RetailerUmModule { }
