import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { ProductService } from 'src/app/services/masterData/product.service';

@Component({
  selector: 'app-request-admin-add',
  templateUrl: './request-admin-add.component.html',
  styleUrls: ['./request-admin-add.component.css']
})
export class RequestAdminAddComponent {
  isEdit: boolean = false;
  requestForm!: FormGroup;
  productList: Array<any> = [];
  filteredProductList: Array<any> = [];

  constructor(private location: Location, private fb: FormBuilder, private productService: ProductService,
    private inventoryService: InventoryService, private router: Router) {
    this.requestForm = this.createForm();
    this.getAllProductList();
  }

  ngOnInit() { }

  createForm() {
    return this.fb.group({
      requestDatas: this.fb.array([this.initRequestData()])
    })
  }

  initRequestData() {
    return this.fb.group({
      product: this.fb.group({
        id: [null, Validators.required]
      }),
      quantity: [null, Validators.required]
    })
  }

  get control() { return this.requestForm.controls; }

  get requestDataArray() { return this.control['requestDatas'] as FormArray; }

  requestData(index: any, formControl: string) {
    return this.requestDataArray.at(index).get(formControl);
  }

  clearForm() {
    this.requestForm.reset();
  }

  cancelBtn() {
    this.location.back();
  }

  createRequest() {
    if (this.requestForm.valid) {
      this.inventoryService.createRequestStock(this.requestForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 201) {
            alert(res.message);
            this.router.navigate(['/retailer/inventory/request-admin/list']);
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      alert('fill all mandate fields');
      this.requestForm.markAllAsTouched();
    }
  }

  addStock() {
    this.requestDataArray.push(this.initRequestData());
  }

  getAllProductList() {
    this.productService.getProductList().subscribe({
      next: (res) => {
        console.log(res);
        if (res.length > 0) {
          this.productList = res;
        }
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  validateProducts(i: any){
    let productId = this.requestDataArray.at(i).get('product')?.get('id')?.value;
    if(productId != null){
      for (let index = 0; index < this.requestDataArray.length; index++) {
        const product = this.requestDataArray.at(index).get('product')?.get('id')?.value;;
        if(productId == product && i != index){
          alert('Cannot add same product twice!!');
          this.requestDataArray.at(i).get('product')?.reset();
          this.requestForm.markAllAsTouched();
        }
      }
    }
  }

  removeProduct(i: any){
    this.requestDataArray.removeAt(i);
  }

}
