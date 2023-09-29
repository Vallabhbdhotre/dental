import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/services/masterData/address.service';
import { ManufacturerService } from 'src/app/services/masterData/manufacturer.service';

@Component({
  selector: 'app-manufacturer-add',
  templateUrl: './manufacturer-add.component.html',
  styleUrls: ['./manufacturer-add.component.css']
})
export class ManufacturerAddComponent {

  isEdit: boolean = false;
  isView: boolean = false;
  manufacurerForm!: FormGroup;
  manufacturerObj: any = {};
  areaList: Array<any> = [];

  constructor(private fb: FormBuilder, private manufacturerService: ManufacturerService, private router: Router,
    private location: Location, private route: ActivatedRoute, private addressService: AddressService) {
    this.manufacurerForm = this.createForm();
    let routingUrl = this.route.snapshot.url.map(segment => segment.path).join('/');
    let id = this.route.snapshot.paramMap.get('id');
    if (routingUrl.includes('edit') && id != null || undefined) {
      this.getManufacturerById(id);
      this.isEdit = true;
    }
    else if (routingUrl.includes('view') && id != null || undefined) {
      this.getManufacturerById(id);
      this.manufacurerForm.disable();
      this.isView = true;
    }
  }

  ngOnInit() {}

  get control() { return this.manufacurerForm.controls; }

  get addressGroup() { return this.manufacurerForm.get('address') as FormGroup; }

  get addressControl() { return this.addressGroup.controls; }

  createForm() {
    return this.fb.group({
      fullName: [null, Validators.required],
      businessName: [null, Validators.required],
      email: [null, Validators.required],
      mobile: [null, Validators.required],
      address: this.fb.group({
        plotNo: [null],
        area: [null],
        landmark: [null],
        city: [null, Validators.required],
        district: [null, Validators.required],
        state: [null, Validators.required],
        country: [null, Validators.required],
        pincode: [null, Validators.required],
        apartmentNo: [null],
      })

    })
  }

  prePopulateForm(data: any){
    this.control['fullName'].patchValue(data.fullName);
    this.control['businessName'].patchValue(data.businessName);
    this.control['email'].patchValue(data.email);
    this.control['mobile'].patchValue(data.mobile);
    this.control['address'].patchValue(data.address);
    let address = data.address;
    this.addressControl['plotNo'].patchValue(address.plotNo);
    this.addressControl['area'].patchValue(address.area);
    this.addressControl['landmark'].patchValue(address.landmark);
    this.addressControl['city'].patchValue(address.city);
    this.addressControl['district'].patchValue(address.district);
    this.addressControl['state'].patchValue(address.state);
    this.addressControl['country'].patchValue(address.country);
    this.addressControl['pincode'].patchValue(address.pincode);
    this.addressControl['apartmentNo'].patchValue(address.apartmentNo);
  }

  clearForm() {
    this.manufacurerForm.reset();
  }

  submit() {
    this.isEdit ? this.updateManufacturer() : this.createManufacturer();
  }

  cancelBtn() {
    this.location.back();
  }

  createManufacturer() {
    if (this.manufacurerForm.valid) {
      this.manufacturerService.addManufacturer(this.manufacurerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 201) {
            alert(res.message);
            this.router.navigate(['/admin/master/manufacturer-list']);
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
    else {
      alert('Fill all mandate fields');
      this.manufacurerForm.markAllAsTouched();
    }
  }


  updateManufacturer() {
    if (this.manufacurerForm.valid) {
      this.manufacturerService.updateManufacturer(this.manufacturerObj.id, this.manufacurerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 202) {
            alert(res.message);
            this.router.navigate(['/admin/master/manufacturer-list']);
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
    else {
      alert('fill all mandate fields');
      this.manufacurerForm.markAllAsTouched();
    }
  }

  getManufacturerById(id: any){
    this.manufacturerService.getManufacturerById(id).subscribe({
      next: (res) => {
        if (res != null) {
          console.log(res);
          this.manufacturerObj = res;
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

  fetchAddressByPinCode(){
    let pincode = this.addressControl['pincode'].value;
    if((pincode != null || undefined) &&  (pincode.toString().length === 6)){
      this.addressService.getAddressByPincode(pincode).subscribe({
        next: (res) => {
          if(res != null){
            console.log(res);
            this.addressControl['country'].patchValue(res.country);
            this.addressControl['state'].patchValue(res.state);
            this.addressControl['district'].patchValue(res.district);
            this.addressControl['city'].patchValue(res.city);
            this.addressControl['landmark'].patchValue(res.division);
            this.areaList = res.areas;
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else{
      alert('Pincode should be 6 digits.')
    }
  }

}
