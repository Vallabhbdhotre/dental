import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: ProductListComponent, pathMatch: "full" },
  { path: "add", component: ProductAddComponent, pathMatch: "full" },
  { path: "edit/:id", component: ProductAddComponent, pathMatch: "full" },
  { path: "view/:id", component: ProductAddComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
