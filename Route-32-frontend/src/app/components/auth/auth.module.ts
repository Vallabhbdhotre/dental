import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ForgotPasswordOtpComponent } from './forgot-password-otp/forgot-password-otp.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    NewPasswordComponent,
    ForgotPasswordOtpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgOtpInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class AuthModule { }
