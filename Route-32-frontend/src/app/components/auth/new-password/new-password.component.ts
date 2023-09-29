import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {

  showPassword: boolean = false
  showConfirmPassword: boolean = false
  resetPasswordForm!: FormGroup;
  userDetail: any = localStorage.getItem('userDetail');

  constructor(private router: Router, private location: Location, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    console.log("ALWASY");
    this.resetPasswordForm = this.createForm();
  }

  get control() { return this.resetPasswordForm.controls; }

  createForm() {
    return this.fb.group({
      userDetail: [this.userDetail, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }

  setNewPassword() {
    if(this.control['password'].value != this.control['confirmPassword'].value){
      alert('Password & Confirm Password not matching');
      this.control['confirmPassword'].reset();
      this.resetPasswordForm.markAllAsTouched();
    }
    else if(this.resetPasswordForm.invalid){
      alert('Fill all mandate fields');
      this.resetPasswordForm.markAllAsTouched();
    }
    else if(this.control['password'].value === this.control['confirmPassword'].value && this.resetPasswordForm.valid ){
      let data = {
        "userDetail": this.userDetail,
        "password": this.control['password'].value
      }
      this.authService.resetPassword(data).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 202) {
            alert(res.message);
            this.router.navigate(['auth/login']);
            localStorage.clear();
          }
        },
        error: (error) => {
          let _error = error.error;
          if (error.status == 412) {
            alert(_error.errorMessage)
          }
        }
      })
    }
  }

  goBack() {
    this.location.back();
  }

  togglePassword(){
   this.showPassword = !this.showPassword 
  }

  toggleConfirmPassword(){
    this.showConfirmPassword = !this.showConfirmPassword 
   }
}

