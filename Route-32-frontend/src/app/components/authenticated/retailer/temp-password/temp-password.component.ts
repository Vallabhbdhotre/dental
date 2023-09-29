import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-temp-password',
  templateUrl: './temp-password.component.html',
  styleUrls: ['./temp-password.component.css']
})
export class TempPasswordComponent {

  tempPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private dialogRef: MatDialogRef<TempPasswordComponent>) {
    this.tempPasswordForm = this.createForm();
  }

  ngOnInit() { }

  get control() { return this.tempPasswordForm.controls; }


  createForm(){
    return this.fb.group({
      currentPassword: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }

  setNewPassword(){
    let crossCheck = this.checkPassword()
    if(crossCheck = false){
      alert('Check Password and confirm password once again');
    }
    else if(this.tempPasswordForm.valid && (crossCheck = true)){
      this.authService.changePassword(this.tempPasswordForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if(res.code == 202){
            alert(res.message);
            this.dialogRef.close();
            this.router.navigate(['/retailer/dashboard']);
          }
        },
        error: (error) => {
          console.log(error);
          let _error = error.error;
          if (error.status == 412) {
            alert(_error.errorMessage)
          }
        },
      })
    }
    else{
      alert('fill all mandate fields')
    }
  }

  checkPassword(){
    let confirmPassword = this.control['confirmPassword'].value;
    let password = this.control['password'].value;
    if(confirmPassword == password){
      return true
    }
    else{
      return false
    }
  }
  
}
