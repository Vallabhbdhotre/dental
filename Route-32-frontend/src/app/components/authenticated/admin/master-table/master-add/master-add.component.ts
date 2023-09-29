import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IntegrationSettingService } from 'src/app/services/masterData/integration-setting.service';

@Component({
  selector: 'app-master-add',
  templateUrl: './master-add.component.html',
  styleUrls: ['./master-add.component.css']
})
export class MasterAddComponent {

  isEdit: boolean = false;
  masterForm!: FormGroup;
  masterList: Array<any> = [];
  masterType: any = null;

  constructor(private fb: FormBuilder, private router: Router, private location: Location, private route: ActivatedRoute,
    private integrationService: IntegrationSettingService) {

    this.masterForm = this.createForm();
    let routingUrl = this.route.snapshot.url.map(segment => segment.path).join('/');
    let type = this.route.snapshot.paramMap.get('type');
    console.log(type);
    if (routingUrl.includes('edit') && type != null || undefined) {
      this.masterType = type;
      this.getMasterByType(type);
      this.isEdit = true;
    }
  }

  get control() { return this.masterForm.controls; }

  get masterArray() { return this.control['masterArray'] as FormArray; }

  masterControl(i: any, formControl: string) {
    return this.masterArray.at(i).get(formControl);
  }

  createForm() {
    return this.fb.group({
      masterArray: this.fb.array([])
    })
  }

  initMasterData() {
    return this.fb.group({
      paramKey: [{ value: null, disabled: true }, Validators.required],
      paramValue: [null, Validators.required],
    })
  }

  getMasterByType(type: any) {
    this.integrationService.getPlatformParamByType(type).subscribe({
      next: (res) => {
        if (res.length > 0) {

          this.masterList = res;
          console.log(this.masterList);
          if (this.masterList.length > 0) {
            for (let index = 0; index < this.masterList.length; index++) {
              const element = this.masterList[index];
              this.masterArray.push(this.initMasterData());
              this.masterArray.at(index).get('paramKey')?.patchValue(element.paramKey);
              this.masterArray.at(index).get('paramValue')?.patchValue(element.paramValue);
            }
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  cancelBtn() {
    this.location.back();
  }

  clearForm() {
    this.masterForm.reset();
  }

  updateMaster() {
    if (this.masterForm.valid) {
      let data = this.masterArray.getRawValue();
      this.integrationService.updatePlatformParamByType(this.masterType, data).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 202) {
            alert(res.message);
            this.router.navigate(['/admin/master/list']);
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
      this.masterForm.markAllAsTouched();
    }
  }

}
