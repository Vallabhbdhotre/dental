import { Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/masterData/category.service';
import { ProductService } from 'src/app/services/masterData/product.service';
import { UomService } from 'src/app/services/masterData/uom.service';

interface FileDisplay {
  name: string;
  type: string;
  url: string;
  base64: string | any;
  id?: any;
}

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  isEdit: boolean = false;
  isView: boolean = false;
  productForm!: FormGroup;
  productObj: any = {};
  categoryList: Array<any> = [];
  uomList: Array<any> = [];
  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedFiles: Array<FileDisplay> = [];

  constructor(private productService: ProductService, private fb: FormBuilder, private location: Location, private route: ActivatedRoute,
    private router: Router, private categoryService: CategoryService, private uomService: UomService) {
    this.productForm = this.createForm();
    let routingUrl = this.route.snapshot.url.map(segment => segment.path).join('/');
    let id = this.route.snapshot.paramMap.get('id');
    if (routingUrl.includes('edit') && id != null || undefined) {
      this.productForm.addControl('isActive', new FormControl());
      this.getProductById(id);
      this.isEdit = true;
    }
    else if (routingUrl.includes('view') && id != null || undefined) {
      this.getProductById(id);
      this.productForm.disable();
      this.isView = true;
    }
  }

  ngOnInit() {
    this.getAllCategoryList();
    this.getAllUomList();
  }

  get control() { return this.productForm.controls; }

  get imageArray() { return this.control["images"] as FormArray; }

  createForm() {
    return this.fb.group({
      name: [null, Validators.required],
      highlightText: [null],
      description: [null, Validators.required],
      category: this.fb.group({
        id: [null, Validators.required]
      }),
      uom: this.fb.group({
        id: [null, Validators.required]
      }),
      salePrice: [null, Validators.required],
      regularPrice: [null, Validators.required],
      discount: [null],
      weight: [null, Validators.required],
      images: this.fb.array([]),
    })
  }

  initImageData() {
    return this.fb.group({
      fileName: [null, Validators.required],
      base64: [null, Validators.required]
    });
  }

  prePopulateForm(data: any) {
    this.control['name'].patchValue(data.name);
    this.control['highlightText'].patchValue(data.highlightText);
    this.control['description'].patchValue(data.description);
    this.control['category'].patchValue(data.category);
    this.control['uom'].patchValue(data.uom);
    this.control['salePrice'].patchValue(data.salePrice);
    this.control['regularPrice'].patchValue(data.regularPrice);
    this.control['discount'].patchValue(data.discount);
    this.control['weight'].patchValue(data.weight);
  }


  clearForm() {
    this.productForm.reset();
    this.productForm.markAllAsTouched();
  }

  cancelBtn() {
    this.location.back();
  }

  submit() {
    this.isEdit ? this.updateProduct() : this.createProduct();
  }

  createProduct() {
    if (this.uploadedFiles.length == 0) {
      alert('Upload atleast one image');
      this.productForm.markAllAsTouched();
    }
    else if (this.productForm.invalid) {
      alert('fill all mandate fields');
      this.productForm.markAllAsTouched();
    }
    if (this.productForm.valid) {
      if (this.uploadedFiles.length >= 1) {
        for (let index = 0; index < this.uploadedFiles.length; index++) {
          const element = this.uploadedFiles[index];
          this.imageArray.push(this.initImageData());
          this.imageArray.at(index).get('fileName')?.patchValue(element.name);
          this.imageArray.at(index).get('base64')?.patchValue(element.base64);
        }
      }
      this.productService.addProduct(this.productForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 201) {
            alert(res.message);
            this.router.navigate(['/admin/product/list']);
          }
        },
        error: (error) => {
          console.log(error);
          let _error = error.error;
          if (error.status == 412) {
            alert(_error.errorMessage)
          }
        }
      })
    }
  }

  updateProduct() {
    if (this.uploadedFiles.length == 0) {
      alert('Upload atleast one image');
      this.productForm.markAllAsTouched();
    }
    else if (this.productForm.invalid) {
      alert('fill all mandate fields');
      this.productForm.markAllAsTouched();
    }
    else if (this.productForm.valid) {
      if (this.uploadedFiles.length >= 1) {
        let filtered: Array<any> = this.uploadedFiles.filter(
          (x: any) => {
            if (x.base64) {
              return x
            }
          }
        )
        for (let index = 0; index < filtered.length; index++) {
          const element = filtered[index];
          if (element.base64) {
            this.imageArray.push(this.initImageData());
            this.imageArray.at(index).get('fileName')?.patchValue(element.name);
            this.imageArray.at(index).get('base64')?.patchValue(element.base64);
          }
        }
        console.log(this.productForm.value);
      }
      this.productService.updateProduct(this.productObj.id, this.productForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 202) {
            alert(res.message);
            this.router.navigate(['/admin/product/list']);
          }
        },
        error: (error) => {
          console.log(error);
          let _error = error.error;
          if (error.status == 412) {
            alert(_error.errorMessage)
          }
        }
      })
    }
    else { }
  }


  getAllCategoryList() {
    this.categoryService.getCategoryList().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.categoryList = res;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getAllUomList() {
    this.uomService.getUomList().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.uomList = res;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getProductById(id: any) {
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        if (res != null) {
          console.log(res);
          this.productObj = res;
          this.uploadedFiles = this.productObj.images;
          for (let index = 0; index < this.uploadedFiles.length; index++) {
            const element = this.uploadedFiles[index];
            const parts = element.url.split('.');
            const extension = parts[parts.length - 1];
            element.type = extension;
          }
          this.prePopulateForm(res);
        }
      },
      error: (error) => {
        console.log(error);
        let _error = error.error;
        if (error.status == 412) {
          alert(_error.errorMessage)
        }
      }
    })
  }

  // Trigger a click event on the hidden file input
  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const fileType = file.type;

      const reader = new FileReader();
      reader.onload = () => {
        const fileDisplay: FileDisplay = {
          name: file.name,
          type: fileType,
          url: reader.result as string,
          base64: reader.result?.toString().split(',')[1]
        };
        this.uploadedFiles.push(fileDisplay);
      };
      reader.readAsDataURL(file);
      console.log(this.uploadedFiles);
    }
  }


  closeImage(index: any, imageId: any) {
    console.log(index, imageId);
    if (this.productObj.id != null && imageId != null) {
      this.productService.deleteProductImage(this.productObj.id, imageId).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 200) {
            alert(res.message);
            this.getProductById(this.productObj.id);
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      this.uploadedFiles.splice(index, 1);
    }
  }

}
