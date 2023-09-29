import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedLayoutRoutingModule } from './authenticated-layout-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { SublevelMenuComponent } from './sidebar/sublevel-menu.component';
import { ActualBodyComponent } from './actual-body/actual-body.component';


@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    AuthenticatedLayoutComponent,
    NavbarComponent,
    SublevelMenuComponent,
    ActualBodyComponent
  ],
  imports: [
    CommonModule,
    AuthenticatedLayoutRoutingModule,
    MatExpansionModule
  ]
})
export class AuthenticatedLayoutModule { }
