import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserRoleService } from 'src/app/services/auth/user-role.service';

@Component({
  selector: 'app-admin-um-add',
  templateUrl: './admin-um-add.component.html',
  styleUrls: ['./admin-um-add.component.css']
})
export class AdminUmAddComponent {

  isEdit: boolean = false;
  isView: boolean = false;
  userForm!: FormGroup;
  @Input() color: ThemePalette = 'warn'
  roleList: Array<any> = [];

  constructor(private authService: AuthService, private fb: FormBuilder, private location: Location, private route: ActivatedRoute,
    private router: Router, private userRoleService: UserRoleService) {
    this.userForm = this.createForm();
    this.getAllRoles();
    let id = this.route.snapshot.paramMap.get('id');
    let routingUrl = this.route.snapshot.url.map(segment => segment.path).join('/');
    if (routingUrl.includes('edit') && id != null || undefined) {
      this.getUserById(id);
      this.userForm.addControl('id', new FormControl(id));
      this.userForm.removeControl('password');
      this.isEdit = true;
    }
    else if (routingUrl.includes('view') && id != null || undefined) {
      this.getUserById(id);
      this.userForm.disable();
      this.isView = true;
    }
  }

  get control() { return this.userForm.controls; }

  get rolesArray() { return this.control['roles'] as FormArray; }

  createForm() {
    return this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      contactNumber: [null, Validators.required],
      emailId: [null, Validators.required],
      password: [null, Validators.required],
      roles: this.fb.array([this.initRoleData()])
    })
  }

  initRoleData() {
    return this.fb.group({
      id: [null, Validators.required]
    })
  }

  prePopulateForm(data: any) {
    this.control['firstName'].patchValue(data.firstName);
    this.control['lastName'].patchValue(data.lastName);
    this.control['emailId'].patchValue(data.emailId);
    this.control['contactNumber'].patchValue(data.contactNumber);
    this.control['roles'].patchValue(data.roles);
  }

  clearForm() {
    this.userForm.reset();
    this.userForm.markAllAsTouched();
  }

  cancelBtn() {
    this.location.back();
  }

  submit() {
    this.isEdit ? this.updateUser() : this.createUser();
  }

  createUser() {
    if (this.userForm.valid) {
      this.authService.addUser(this.userForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 201) {
            alert(res.message);
            this.router.navigate(['/admin/um/user-list']);
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
      this.userForm.markAllAsTouched();
      alert('Fill all mandate fields');
    }
  }

  updateUser() {
    if (this.userForm.valid) {
      this.authService.updateUser(this.userForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 202) {
            alert(res.message);
            this.router.navigate(['/admin/um/user-list']);
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
      this.userForm.markAllAsTouched();
      alert('Fill all mandate fields');
    }
  }

  getUserById(id: any) {
    this.authService.getUserById(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res != null) {
          this.prePopulateForm(res);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getAllRoles() {
    this.userRoleService.getRolesList().subscribe({
      next: (res) => {
        console.log(res);
        if (res.length > 0) {
          this.roleList = res;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
