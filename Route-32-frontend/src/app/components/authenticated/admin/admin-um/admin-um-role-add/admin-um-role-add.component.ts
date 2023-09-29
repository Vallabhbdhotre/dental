import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRoleService } from 'src/app/services/auth/user-role.service';

@Component({
  selector: 'app-admin-um-role-add',
  templateUrl: './admin-um-role-add.component.html',
  styleUrls: ['./admin-um-role-add.component.css']
})
export class AdminUmRoleAddComponent {

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

  ngOnInit() { }

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

  submit() {
    this.isEdit ? this.updateRole() : this.createRole();
  }

  cancelBtn() {
    this.location.back();
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

      // Message Template module.
      if (authcode == 'TMP0001') {
        for (let index = 0; index < this.tmpList.length; index++) {
          const element = this.tmpList[index];
          if (element.code == 'TMP0002') {
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
      if (authcode == 'TMP0003') {
        for (let index = 0; index < this.tmpList.length; index++) {
          const element = this.tmpList[index];
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

      // Onboarding module
      if (authcode == 'RET0001') {
        for (let index = 0; index < this.onbList.length; index++) {
          const element = this.onbList[index];
          if (element.code == 'RET0002') {
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
      if (authcode == 'RET0003') {
        for (let index = 0; index < this.onbList.length; index++) {
          const element = this.onbList[index];
          if (element.code == 'RET0002') {
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
      if (authcode == 'RET0004') {
        for (let index = 0; index < this.onbList.length; index++) {
          const element = this.onbList[index];
          if (element.code == 'RET0002') {
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
          if (element.code == 'RET0003') {
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

      // ORG0001
      if (authcode == 'ORG0001') {
        for (let index = 0; index < this.onbList.length; index++) {
          const element = this.onbList[index];
          if (element.code == 'RET0002') {
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
      if (authcode == 'ORG0002') {
        for (let index = 0; index < this.onbList.length; index++) {
          const element = this.onbList[index];
          if (element.code == 'RET0002') {
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

      // Product Master Module
      if (authcode == 'PRD0001') {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          if (element.code == 'PRD0003') {
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
      if (authcode == 'PRD0004') {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          if (element.code == 'PRD0002') {
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
          if (element.code == 'PRD0003') {
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
      if (authcode == 'PRD0005') {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          if (element.code == 'PRD0003') {
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

      if (authcode == 'PRD0006') {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          if (element.code == 'PRD0003') {
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

      // Category Module
      if (authcode == 'CAT0001') {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          if (element.code == 'CAT0006') {
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
      if (authcode == 'CAT0002') {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          if (element.code == 'CAT0003') {
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
          if (element.code == 'CAT0006') {
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
      if (authcode == 'CAT0004') {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          if (element.code == 'CAT0006') {
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
      if (authcode == 'CAT0005') {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          if (element.code == 'CAT0006') {
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

      // UOM Module UOM0001
      if (authcode == 'UOM0001') {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          if (element.code == 'UOM0005') {
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
      if (authcode == 'UOM0002') {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          if (element.code == 'UOM0003') {
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
          if (element.code == 'UOM0005') {
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
      if (authcode == 'UOM0004') {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          if (element.code == 'UOM0005') {
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

      // manufacturer Module MAN0001
      if (authcode == 'MAN0001') {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          if (element.code == 'MAN0004') {
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
      if (authcode == 'MAN0002') {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          if (element.code == 'MAN0003') {
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
          if (element.code == 'MAN0004') {
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
      if (authcode == 'MAN0003') {
        for (let index = 0; index < this.mstList.length; index++) {
          const element = this.mstList[index];
          if (element.code == 'MAN0004') {
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
      if (authcode == 'PRO0001') {
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
      if (authcode == 'PRO0002') {
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

}