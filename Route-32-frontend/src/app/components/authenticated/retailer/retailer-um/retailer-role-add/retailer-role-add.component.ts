import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRoleService } from 'src/app/services/auth/user-role.service';

@Component({
  selector: 'app-retailer-role-add',
  templateUrl: './retailer-role-add.component.html',
  styleUrls: ['./retailer-role-add.component.css']
})
export class RetailerRoleAddComponent {

  isEdit: boolean = false;
  roleForm!: FormGroup;
  roleObj: any = {};
  permissionList: Array<any> = [];
  usmList: Array<any> = [];
  tmpList: Array<any> = [];
  onbList: Array<any> = [];
  mstList: Array<any> = [];
  invList: Array<any> = [];

  constructor(private fb: FormBuilder, private location: Location, private userRoleService: UserRoleService,
    private route: ActivatedRoute, private router: Router) {
    this.roleForm = this.createForm();
    this.getAllPermissionList();
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.isEdit = true;
      this.getRoleById(id);
    }
  }
  get control() { return this.roleForm.controls; }

  get permissionArray() {
    return this.control['permissions'] as FormArray;
  }

  createForm() {
    return this.fb.group({
      name: [null, Validators.required],
      permissions: this.fb.array([]),
    })
  }

  initPermission(data: any) {
    return this.fb.group({
      id: [data]
    })
  }

  cancelBtn() {
    this.location.back();
  }

  submit() {
    this.isEdit ? this.updateRole() : this.createRole();
  }

  createRole() {
    if (this.roleForm.valid && this.permissionArray.length > 0) {
      this.userRoleService.createRole(this.roleForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 201) {
            alert(res.message);
            this.router.navigate(['/admin/um/role-list']);
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    else if (this.permissionArray.length == 0) {
      alert('Please select atleast one permission')
      // Swal.fire({
      //   title: 'Info',
      //   text: 'Please select atleast one permission',
      //   timer: 5000,
      //   icon: 'info',
      // });
    }
    else {
      alert('fill all mandate fields');
    }
  }

  updateRole() {
    if (this.roleForm.valid && this.permissionArray.length > 0) {
      this.roleForm.addControl("id", new FormControl());
      this.roleForm.get('id')?.patchValue(this.roleObj.id);
      this.userRoleService.updateRole(this.roleForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 202) {
            alert(res.message);
            this.router.navigate(['/admin/um/role-list']);
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    else if (this.permissionArray.length == 0) {
      alert('Please select atleast one permission')
    }
    else {
      alert('fill all mandate fields');
      this.roleForm.markAllAsTouched();
    }
  }

  getAllPermissionList() {
    this.userRoleService.getPermissonList().subscribe({
      next: (res) => {
        console.log(res);
        if (res.length > 0) {
          this.permissionList = res;
          this.filterPermissionList();
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  filterPermissionList() {
    if (this.permissionList.length > 0) {
      this.usmList = [];
      this.tmpList = [];
      this.onbList = [];
      this.mstList = [];
      this.invList = [];
      this.permissionList.filter((item) => {
        item['isChecked'] = false;
        let permissionCategory = item.permissionCategory;
        if (permissionCategory.code == "USM") {
          this.usmList.push(item);
        }
        else if (permissionCategory.code === "TMP") {
          this.tmpList.push(item);
        }
        else if (permissionCategory.code === "ONB") {
          this.onbList.push(item);
        }
        else if (permissionCategory.code === "MST") {
          this.mstList.push(item);
        }
        else if (permissionCategory.code === "INV") {
          this.invList.push(item);
        }
      })
    }
  }

  getRoleById(id: any) {
    this.userRoleService.getRoleById(id).subscribe({
      next: (res) => {
        if (res != null) {
          this.roleObj = res;
          this.prePopulateData(res);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  prePopulateData(data: any) {
    let permissions = data.permissions;
    this.control['name'].patchValue(data.name);
    for (let index = 0; index < permissions.length; index++) {
      const permission = permissions[index];

      for (let index = 0; index < this.permissionList.length; index++) {
        const allPermission = this.permissionList[index];
        if (permission.code == allPermission.code) {
          allPermission['isChecked'] = true;
          this.permissionArray.push(this.initPermission(permission.id));
        }
      }
    }
  }

  clearForm() {
    for (let index = 0; index < this.permissionList.length; index++) {
      const allPermission = this.permissionList[index];
      allPermission['isChecked'] == false;
    }
    this.filterPermissionList();
    this.permissionArray.clear();
    this.roleForm.reset();
  }

  checkAllCheckbox(str: string, event: any) {
    if (str == "usmList") {
      console.log(str);
      if (event.target.checked) {
        for (let index = 0; index < this.usmList.length; index++) {
          const element = this.usmList[index];
          console.log(element);
          element.isChecked = true;
          this.permissionArray.push(this.initPermission(element.id));
        }
      }
      else {
        for (let index = 0; index < this.usmList.length; index++) {
          const element = this.usmList[index];
          console.log(element);
          let idToRemove = this.permissionArray.controls.findIndex((res) => res.value.id == element.id);
          element.isChecked = false;
          this.permissionArray.removeAt(idToRemove);
        }
      }
    }
    if (str == "tmpList") {
      console.log(str);
      if (event.target.checked) {
        for (let index = 0; index < this.tmpList.length; index++) {
          const element = this.tmpList[index];
          console.log(element);
          element.isChecked = true;
          this.permissionArray.push(this.initPermission(element.id));
        }
      }
      else {
        for (let index = 0; index < this.tmpList.length; index++) {
          const element = this.tmpList[index];
          console.log(element);
          let idToRemove = this.permissionArray.controls.findIndex((res) => res.value.id == element.id);
          element.isChecked = false;
          this.permissionArray.removeAt(idToRemove);
        }
      }
    }
    if (str == "onbList") {
      console.log(str);
      if (event.target.checked) {
        for (let index = 0; index < this.onbList.length; index++) {
          const element = this.onbList[index];
          console.log(element);
          element.isChecked = true;
          this.permissionArray.push(this.initPermission(element.id));
        }
      }
      else {
        for (let index = 0; index < this.onbList.length; index++) {
          const element = this.onbList[index];
          console.log(element);
          let idToRemove = this.permissionArray.controls.findIndex((res) => res.value.id == element.id);
          element.isChecked = false;
          this.permissionArray.removeAt(idToRemove);
        }
      }
    }
    if (str == "mstList") {
      console.log(str);
      if (event.target.checked) {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          console.log(element);
          element.isChecked = true;
          this.permissionArray.push(this.initPermission(element.id));
        }
      }
      else {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          console.log(element);
          let idToRemove = this.permissionArray.controls.findIndex((res) => res.value.id == element.id);
          element.isChecked = false;
          this.permissionArray.removeAt(idToRemove);
        }
      }
    }
    if (str == "invList") {
      console.log(str);
      if (event.target.checked) {
        for (let index = 0; index < this.invList.length; index++) {
          const element = this.invList[index];
          console.log(element);
          element.isChecked = true;
          this.permissionArray.push(this.initPermission(element.id));
        }
      }
      else {
        for (let index = 0; index < this.invList.length; index++) {
          const element = this.invList[index];
          console.log(element);
          let idToRemove = this.permissionArray.controls.findIndex((res) => res.value.id == element.id);
          element.isChecked = false;
          this.permissionArray.removeAt(idToRemove);
        }
      }
    }
  }

  onClick(event: any, id: number, authcode: any) {
    if (event.target.checked) {
      console.log('this is authcode ', authcode);
      let found = false;
      for (let index = 0; index < this.permissionArray.controls.length; index++) {
        const element = this.permissionArray.controls[index];
        if (element.value.id == id) {
          console.log('this is element ', element);
          found = true;
          break;
        }
      }
      if (found == false) {
        this.permissionArray.push(this.initPermission(id));
      }

      //if create role selected assign role listing
      if (authcode == 'UMC0001') {
        for (let index = 0; index < this.usmList.length; index++) {
          const element = this.usmList[index];
          if (element.code == 'UMC0002') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
        }
      }
      if (authcode == 'UMC0002') {
        for (let index = 0; index < this.usmList.length; index++) {
          const element = this.usmList[index];
          if (element.code == 'UMC0006') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
          if (element.code == 'UMC0001') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
        }
      }
      if(authcode == 'UMC0004') {
        for (let index = 0; index < this.usmList.length; index++) {
          const element = this.usmList[index];
          if (element.code == 'UMC0005') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
          if (element.code == 'UMC0001') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
        }
      }

      if(authcode == 'UMC0017'){
        for (let index = 0; index < this.usmList.length; index++) {
          const element = this.usmList[index];
          if (element.code == 'UMC0006') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
        }
      }
      if(authcode == 'UMC0013'){
        for (let index = 0; index < this.usmList.length; index++) {
          const element = this.usmList[index];
          if (element.code == 'UMC0006') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
          if (element.code == 'UMC0012') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
        }
      }
      if(authcode == 'UMC0015'){
        for (let index = 0; index < this.usmList.length; index++) {
          const element = this.usmList[index];
          if (element.code == 'UMC0012') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
        }
      }

      // Sub-Retailer Onboarding module.
      if(authcode == 'SRT0001'){
        for (let index = 0; index < this.onbList.length; index++) {
          const element = this.onbList[index];
          if (element.code == 'SRT0003') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission.value);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
        }
      }
      if(authcode == 'SRT0002'){
        for (let index = 0; index < this.onbList.length; index++) {
          const element = this.onbList[index];
          if (element.code == 'SRT0003') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission.value);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
          if (element.code == 'SRT0004') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission.value);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
        }
        console.log("im here");
      }

      if(authcode == 'ORG0001'){
        for (let index = 0; index < this.onbList.length; index++) {
          const element = this.onbList[index];
          if (element.code == 'SRT0003') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission.value);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
        }
      }
      if(authcode == 'ORG0002'){
        for (let index = 0; index < this.onbList.length; index++) {
          const element = this.onbList[index];
          if (element.code == 'SRT0003') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission.value);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
        }
      }

      // inventory module
      if(authcode == 'PRO0001'){
        for (let index = 0; index < this.invList.length; index++) {
          const element = this.invList[index];
          if (element.code == 'PRO0004') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission.value);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
        }
      }
      if(authcode == 'PRO0002'){
        for (let index = 0; index < this.invList.length; index++) {
          const element = this.invList[index];
          if (element.code == 'PRO0003') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission.value);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
          if (element.code == 'PRO0004') {
            let found = false;
            for (let index = 0; index < this.permissionArray.controls.length; index++) {
              const permission = this.permissionArray.controls[index];
              console.log('this is already permissions ', permission.value);
              if (permission.value.id == element.id) {
                console.log('we found duplicate');
                found = true;
                break;
              }
            }
            if (found == false) {
              element['isChecked'] = true;
              this.permissionArray.push(this.initPermission(element.id));
            }
          }
        }
      }
    }
    else {
      let idToRemove = this.permissionArray.controls.findIndex((res) => res.value.id == id);
      this.permissionArray.removeAt(idToRemove);
    }
    console.log(this.permissionArray.value);
  }

}
