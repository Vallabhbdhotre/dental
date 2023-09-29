import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TempPasswordComponent } from '../../authenticated/retailer/temp-password/temp-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private route: Router, private authService: AuthService, private fb: FormBuilder,
    private matDialog: MatDialog) { }


  ngOnInit() {
    console.log("ALWASY");
    this.loginForm = this.createForm();
    console.log(this.loginForm.value);
    localStorage.clear();
    sessionStorage.clear();
  }

  get control() { return this.loginForm.controls; }

  createForm() {
    return this.fb.group({
      userDetail: [null, Validators.required],
      password: [null, Validators.required]
    });
  }
  
  sendOtp() {
    this.route.navigate(['auth/verify-otp']);
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res != null) {
            let data = {
              emailId: res.emailId,
              userFirstName: res.userFirstName,
              userLastName: res.userLastName,
              token: res.token,
              userId: res.userId,
              orgId: res.orgId,
              orgType: res.orgType,
              orgName: res.orgName
            };
            console.log(data);
            sessionStorage.setItem("userData", JSON.stringify(data));
            this.authService.currentUserSubject.next(data);
            if (res.orgType == "ADMIN") {
              this.route.navigate(["admin/dashboard"]);
            }
            else if(res.orgType == "RETAILER") {
              this.route.navigate(["retailer/dashboard"]);
              if(res.isPasswordUpdate == false){
                const dialogConfig = new MatDialogConfig();
                dialogConfig.hasBackdrop = false; // Clicking outside will not close the dialog
                dialogConfig.closeOnNavigation = true;
                this.matDialog.open(TempPasswordComponent, dialogConfig);
              }
            }
            else {
              console.log("This is sub-retailer");
            }
            // else if(res.orgType == "SUB_RETAILER") {}
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
    else {
      alert('Fill all mandate fields');
      this.loginForm.markAllAsTouched();
    }
  }

  
}
