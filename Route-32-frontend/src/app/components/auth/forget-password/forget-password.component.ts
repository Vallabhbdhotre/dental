import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  forgetPasswordForm!: FormGroup;
  constructor(private router: Router, private location: Location ,private authService: AuthService, private fb: FormBuilder) { }
  
  ngOnInit() {
    console.log("ALWAYS");
    this.forgetPasswordForm = this.createForm();
    console.log(this.forgetPasswordForm.value);

  }
  

  createForm(){
    return this.fb.group({
      userDetail: [null, Validators.required]
    })
  }

  get control() {return this.forgetPasswordForm.controls;}
  
  changePassword(){
    if(this.forgetPasswordForm.valid){
      this.authService.sendOtpForgetPassword(this.forgetPasswordForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if(res.code == 200){
            alert(res.message);
            this.router.navigate(['auth/forgot-password-otp']);
            localStorage.setItem('userDetail', this.control['userDetail'].value);
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
    else{
      this.forgetPasswordForm.markAllAsTouched();
      alert('Fill all mandate fields');
    }
  }


  goBack(){
    this.location.back();
  }
  

}
