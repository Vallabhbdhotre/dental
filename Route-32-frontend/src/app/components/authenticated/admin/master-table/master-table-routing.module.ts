import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManufacturerAddComponent } from './manufacturer-add/manufacturer-add.component';
import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';
import { MasterAddComponent } from './master-add/master-add.component';
import { MasterListComponent } from './master-list/master-list.component';
import { TemplateAddComponent } from './template-add/template-add.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { UomAddComponent } from './uom-add/uom-add.component';
import { UomListComponent } from './uom-list/uom-list.component';

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: MasterListComponent, pathMatch: "full" },
  { path: "edit/:type", component: MasterAddComponent, pathMatch: "full" },
  { path: "manufacturer-list", component: ManufacturerListComponent, pathMatch: "full" },
  { path: "manufacturer-add", component: ManufacturerAddComponent, pathMatch: "full" },
  { path: "manufacturer-edit/:id", component: ManufacturerAddComponent, pathMatch: "full" },
  { path: "manufacturer-view/:id", component: ManufacturerAddComponent, pathMatch: "full" },
  { path: "template-list", component: TemplateListComponent, pathMatch: "full" },
  { path: "template-edit/:id", component: TemplateAddComponent, pathMatch: "full" },
  { path: "template-view/:id", component: TemplateAddComponent, pathMatch: "full" },
  { path: "uom-list", component: UomListComponent, pathMatch: "full" },
  { path: "uom-add", component: UomAddComponent, pathMatch: "full" },
  { path: "uom-edit/:id", component: UomAddComponent, pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterTableRoutingModule { }
