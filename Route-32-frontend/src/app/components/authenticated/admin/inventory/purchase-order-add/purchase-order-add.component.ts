import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PurchaseOrderService } from 'src/app/services/inventory/purchase-order.service';
import { ManufacturerService } from 'src/app/services/masterData/manufacturer.service';
import { ProductService } from 'src/app/services/masterData/product.service';

@Component({
  selector: 'app-purchase-order-add',
  templateUrl: './purchase-order-add.component.html',
  styleUrls: ['./purchase-order-add.component.css'],
})
export class PurchaseOrderAddComponent {
  isView: boolean = false;
  poForm!: FormGroup;
  productList: Array<any> = [];
  filteredProductList: Array<any> = [];
  manufacturerList: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private poService: PurchaseOrderService,
    private router: Router,
    private productService: ProductService,
    private masterService: ManufacturerService,
    private route: ActivatedRoute
  ) {
    this.getAllProducutList();
    this.getAllManufacturerList();

    this.poForm = this.createForm();
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null || undefined) {
      this.isView = true;
      this.getPoById(id);
    }
  }

  ngOnInit() {}

  createForm() {
    return this.fb.group({
      manufacturer: this.fb.group({
        id: [null, Validators.required],
      }),
      poData: this.fb.array([this.poInitalGroup()]),
      expectedDelivery: [null, Validators.required],
      instructions: [null],
    });
  }

  prePopulateForm(data: any) {
    this.control['manufacturer'].patchValue(data.manufacturer);
    let test = new Date(data.expectedDelivery).toISOString();
    let [date, time] = test.split('T');
    this.control['expectedDelivery'].patchValue(date);
    this.control['instructions'].patchValue(data.instructions);
    let poData: Array<any> = data.poData;
    if (poData.length > 0) {
      this.poDataArray.clear();
      for (let index = 0; index < poData.length; index++) {
        const element = poData[index];
        this.addPoData();
        this.poDataArray.at(index).get('product')?.patchValue(element.product);
        this.poDataArray
          .at(index)
          .get('quantity')
          ?.patchValue(element.quantity);
      }
    }
    this.poForm.disable();
  }

  get control() {
    return this.poForm.controls;
  }

  get poDataArray() {
    return this.control['poData'] as FormArray;
  }

  productControls(index: any) {
    return this.poDataArray.at(index).get('product') as FormGroup;
  }

  clearForm() {
    this.poForm.reset();
  }

  cancelBtn() {
    this.location.back();
  }

  poInitalGroup() {
    return this.fb.group({
      product: this.fb.group({
        id: [null, Validators.required],
      }),
      quantity: [null, Validators.required],
    });
  }

  addPoData() {
    this.poDataArray.push(this.poInitalGroup());
  }

  deletePO(index: any) {
    this.poDataArray.removeAt(index);
  }

  createPO() {
    if (this.poForm.valid) {
      this.poService.addPurchaseOrder(this.poForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 201) {
            alert(res.message);
            this.router.navigate(['/admin/inventory/purchase-order/list']);
          }
        },
        error: (error) => {
          console.log(error);
          let _error = error.error;
          if (error.status == 412) {
            alert(_error.errorMessage);
          }
        },
      });
    } else {
      alert('fill all mandate fields');
      this.poForm.markAllAsTouched();
    }
  }

  getAllProducutList() {
    this.productService.getProductList().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.productList = res;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSelectionChange(i: number) {
    let productId = this.productControls(i).get('id')?.value;
    console.log('this is productCode ', productId);
    for (let index = 0; index < this.poDataArray.length; index++) {
      const formGroup = this.poDataArray.at(index);
      let formProductId = formGroup.get('product.id')?.value;
      console.log('formProductId', formProductId);
      if (productId === formProductId && index != i) {
        alert('we have duplicate product selected');
        this.poDataArray.at(i).get('product.id')?.setValue(null);
      }
    }
  }

  getAllManufacturerList() {
    this.masterService.getManufacturerList().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.manufacturerList = res;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getPoById(id: any) {
    this.poService.getPurchaseOrderById(id).subscribe({
      next: (res) => {
        if (res != null) {
          console.log(res);
          this.prePopulateForm(res);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
