import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UomService } from 'src/app/services/masterData/uom.service';

@Component({
  selector: 'app-uom-add',
  templateUrl: './uom-add.component.html',
  styleUrls: ['./uom-add.component.css']
})
export class UomAddComponent {

  isEdit: Boolean = false;
  uomForm!: FormGroup
  uomObj: any = {};

  constructor(private uomService: UomService, private fb: FormBuilder, private location: Location, private route: ActivatedRoute,
    private router: Router) {
    this.uomForm = this.createForm();
    // let routingUrl = this.route.snapshot.url.map(segment => segment.path).join('/');
    let id = this.route.snapshot.paramMap.get('id');
    // console.log(routingUrl);
    if(id != null || undefined){
      this.getUomById(id);
      this.isEdit = true;
    }
  }

  get control() { return this.uomForm.controls; }


  createForm(){
    return this.fb.group({
      name: [null, Validators.required],
    })
  }

  clearForm() {
    this.uomForm.reset();
  }

  cancelBtn() {
    this.location.back();
  }

  submit() {
    this.isEdit ? this.updateUom() : this.createUom();
  }

  createUom(){
    if(this.uomForm.valid){
      this.uomService.addUom(this.uomForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if(res.code == 201){
            alert(res.message);
            this.router.navigate(['/admin/master/uom-list']);
          }
        },
        error: (error) => {
          console.log(error);
          let _error = error.error;
          if(error.status == 412){
            alert(_error.errorMessage)
          }
        }
      })
    }
    else {
      alert('fill mandate fields');
      this.uomForm.markAllAsTouched();
    }
  }

  updateUom(){
    if(this.uomForm.valid){
      this.uomService.updateUom(this.uomObj?.id ,this.uomForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if(res.code == 202){
            alert(res.message);
            this.router.navigate(['/admin/master/uom-list']);
          }
        },
        error: (error) => {
          console.log(error);
          let _error = error.error;
          if(error.status == 412){
            alert(_error.errorMessage)
          }
        }
      })
    }
    else{
      this.uomForm.markAllAsTouched();
      alert('Fill all mandate fields');
    }
  }

  getUomById(id: any){
    this.uomService.getUomById(id).subscribe({
      next: (res) => {
        console.log(res);
        if(res != null){
          this.uomObj = res;
          this.control['name'].patchValue(res.name);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
