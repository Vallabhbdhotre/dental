import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterTableRoutingModule } from './master-table-routing.module';
import { MasterListComponent } from './master-list/master-list.component';
import { MasterAddComponent } from './master-add/master-add.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';
import { ManufacturerAddComponent } from './manufacturer-add/manufacturer-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateAddComponent } from './template-add/template-add.component';
import { NgxEditorModule } from 'ngx-editor';
import { UomListComponent } from './uom-list/uom-list.component';
import { UomAddComponent } from './uom-add/uom-add.component';



@NgModule({
  declarations: [
    MasterListComponent,
    MasterAddComponent,
    ManufacturerListComponent,
    ManufacturerAddComponent,
    TemplateListComponent,
    TemplateAddComponent,
    UomListComponent,
    UomAddComponent
  ],
  imports: [
    CommonModule,
    MasterTableRoutingModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxEditorModule,
  ]
})
export class MasterTableModule { }
