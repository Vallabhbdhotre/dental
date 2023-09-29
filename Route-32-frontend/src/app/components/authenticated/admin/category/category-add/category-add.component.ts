import { Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/masterData/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {

  isEdit: boolean = false;
  categoryForm!: FormGroup;
  categoryObj: any = {};
  @ViewChild('fileInput') fileInput!: ElementRef;
  base: any = null;

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private location: Location, private route: ActivatedRoute,
    private router: Router) {
    this.categoryForm = this.createForm();
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null || undefined) {
      this.getCategoryById(id);
      this.isEdit = true;
    }
  }

  get control() { return this.categoryForm.controls; }

  get imageGroup() { return this.control["images"] as FormGroup; }

  get base64() { return this.imageGroup.get('base64')?.value; }

  createForm() {
    return this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      images: this.fb.group({
        fileName: [null, Validators.required],
        base64: [null, Validators.required]
      })
    })
  }

  clearForm() {
    this.categoryForm.reset();
    this.categoryForm.markAllAsTouched();
  }

  cancelBtn() {
    this.location.back();
  }

  submit() {
    this.isEdit ? this.updateCategory() : this.createCategory();
  }

  createCategory() {
    if (this.imageGroup.invalid) {
      this.categoryForm.markAllAsTouched();
      alert('Upload one image');
    }
    else if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      alert('Fill all mandate fields');
    }
    else if (this.categoryForm.valid) {
      this.categoryService.addCategory(this.categoryForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 201) {
            alert(res.message);
            this.router.navigate(['/admin/category/list']);
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

  updateCategory() {
    if (this.imageGroup.invalid) {
      this.categoryForm.markAllAsTouched();
      alert('Upload one image');
    }
    else if (this.categoryForm.valid) {
      this.categoryService.updateCategory(this.categoryObj.id, this.categoryForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 202) {
            alert(res.message);
            this.router.navigate(['/admin/category/list']);
          }
        },
        error: (error) => {
          console.log(error);
          let _error = error.error;
          if (error.status == 412) {
            alert(_error.errorMessage);
            this.getCategoryById(this.categoryObj.id);
          }
        }
      })
    }
    else {
      this.categoryForm.markAllAsTouched();
      alert('Fill all mandate fields');
    }
  }

  getCategoryById(id: any) {
    this.categoryService.getCategoryById(id).subscribe({
      next: (res) => {
        if (res != null) {
          this.categoryObj = res;
          this.control['name'].patchValue(res.name);
          this.control['description'].patchValue(res.description);
          this.imageGroup.removeControl('fileName');
          this.imageGroup.removeControl('base64');
          this.base = res.image;
          console.log(this.categoryForm.value);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  // Trigger a click event on the hidden file input
  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const selectedFiles = event.target.files[0];
    if (selectedFiles != null) {
      const file = selectedFiles
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        let data = {
          "fileName": file.name,
          "base": e.target.result as string,
          "base64": reader.result?.toString().split(',')[1]
        }
        if (this.imageGroup.get('fileName') == null) {
          this.imageGroup.addControl('fileName', new FormControl(null, Validators.required));
          this.imageGroup.addControl('base64', new FormControl(null, Validators.required));
        }
        this.imageGroup.get('fileName')?.patchValue(data.fileName);
        this.imageGroup.get('base64')?.patchValue(data.base64);
        this.base = data.base;
        console.log(this.categoryForm.value);
      }
    }
  }

  closeImage() {
    if (this.base != null) {
      this.base = null;
      this.imageGroup.get('fileName')?.patchValue(null);
      this.imageGroup.get('base64')?.patchValue(null);
      if (this.imageGroup.get('fileName') == null) {
        this.imageGroup.addControl('fileName', new FormControl(null, Validators.required));
        this.imageGroup.addControl('base64', new FormControl(null, Validators.required));
      }
      console.log(this.categoryForm.value);
    }
  }

}
