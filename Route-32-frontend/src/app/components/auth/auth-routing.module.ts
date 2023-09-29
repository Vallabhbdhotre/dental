import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ForgotPasswordOtpComponent } from './forgot-password-otp/forgot-password-otp.component';
import { LoginComponent } from './login/login.component';
import { NewPasswordComponent } from './new-password/new-password.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "forgot-password", component: ForgetPasswordComponent, pathMatch: "full" },
  { path: "forgot-password-otp", component: ForgotPasswordOtpComponent, pathMatch: "full" },
  { path: "new-password", component: NewPasswordComponent, pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
