import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RetailerOnboardingService } from 'src/app/services/onboarding/retailer-onboarding.service';
import { AddressService } from 'src/app/services/masterData/address.service';

@Component({
  selector: 'app-retailer-add',
  templateUrl: './retailer-add.component.html',
  styleUrls: ['./retailer-add.component.css']
})
export class RetailerAddComponent {
  isEdit: Boolean = false;
  isView: Boolean = false;
  retailerForm!: FormGroup;
  retailerObj: any = {};
  areaList: Array<any> = [];

  constructor(private onboardingService: RetailerOnboardingService, private fb: FormBuilder, private location: Location, private route: ActivatedRoute,
    private router: Router, private addressService: AddressService) {
    this.retailerForm = this.createForm();
    let routingUrl = this.route.snapshot.url.map(segment => segment.path).join('/');
    let id = this.route.snapshot.paramMap.get('id');
    if (routingUrl.includes('retailer-edit') && id != null || undefined) {
      this.retailerForm.addControl('isActive', new FormControl());
      this.getRetailerById(id);
      this.isEdit = true;
    }
    else if (routingUrl.includes('retailer-view') && id != null || undefined) {
      this.retailerForm.addControl('isActive', new FormControl());
      this.getRetailerById(id);
      this.retailerForm.disable();
      this.isView = true;
    }
  }

  ngOnInit() { }

  get control() { return this.retailerForm.controls; }

  get address() { return this.retailerForm.get('address') as FormGroup; }

  get addressControl() { return this.address.controls; }


  createForm() {
    return this.fb.group({
      businessName: [null, Validators.required],
      pocFirstName: [null, Validators.required],
      pocLastName: [null, Validators.required],
      emailId: [null, Validators.required],
      mobileNumber: [null, Validators.required],
      commissionInPercent: [null, Validators.required],
      address: this.fb.group({
        plotNo: [null],
        area: [null],
        landmark: [null],
        city: [null, Validators.required],
        district: [null, Validators.required],
        state: [null, Validators.required],
        country: [null, Validators.required],
        pincode: [null, Validators.required],
        apartmentNo: [null]
      })
    })
  }

  prePopulateForm(data: any) {
    this.control['businessName'].patchValue(data.businessName);
    this.control['pocFirstName'].patchValue(data.pocFirstName);
    this.control['pocLastName'].patchValue(data.pocLastName);
    this.control['emailId'].patchValue(data.emailId);
    this.control['mobileNumber'].patchValue(data.mobileNumber);
    this.control['commissionInPercent'].patchValue(data.commissionInPercent);
    this.control['commissionInPercent'].disable();
    let address = data.address;
    this.address.get('plotNo')?.patchValue(address.plotNo);
    this.address.get('area')?.patchValue(address.area);
    this.address.get('landmark')?.patchValue(address.landmark);
    this.address.get('city')?.patchValue(address.city);
    this.address.get('district')?.patchValue(address.district);
    this.address.get('state')?.patchValue(address.state);
    this.address.get('country')?.patchValue(address.country);
    this.address.get('pincode')?.patchValue(address.pincode);
    this.address.get('apartmentNo')?.patchValue(address.apartmentNo);
    this.control['isActive'].patchValue(data.isActive);
  }

  clearForm() {
    this.retailerForm.reset();
    this.retailerForm.markAllAsTouched();
  }


  submit() {
    this.isEdit ? this.updateRetailer() : this.createRetailer();
  }

  cancelBtn() {
    this.location.back();
  }

  createRetailer() {
    if (this.retailerForm.valid) {
      this.onboardingService.addRetailer(this.retailerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 201) {
            alert(res.message);
            this.router.navigate(['/admin/onboarding/retailer-list']);
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
      this.retailerForm.markAllAsTouched();
    }
  }

  updateRetailer() {
    if (this.retailerForm.valid) {
      this.onboardingService.updateRetailer(this.retailerObj.id, this.retailerForm.getRawValue()).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 202) {
            alert(res.message);
            this.router.navigate(['/admin/onboarding/retailer-list']);
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
      this.retailerForm.markAllAsTouched();
    }
  }

  getRetailerById(id: any){
    this.onboardingService.getRetailerById(id).subscribe({
      next: (res) => {
        if (res != null) {
          this.retailerObj = res;
          this.prePopulateForm(res);
          console.log(this.retailerForm.value);
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
