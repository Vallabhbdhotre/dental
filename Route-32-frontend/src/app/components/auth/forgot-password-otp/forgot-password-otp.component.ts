import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password-otp',
  templateUrl: './forgot-password-otp.component.html',
  styleUrls: ['./forgot-password-otp.component.css'],
})
export class ForgotPasswordOtpComponent {
  forgetPasswordForm!: FormGroup;
  userDetail: any = localStorage.getItem('userDetail');

  otpControl: FormControl = new FormControl('', Validators.required);

  minutes: number = 2;
  seconds: number = 0;
  timerInterval: any;
  showTimer: boolean = true;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    console.log('ALWASY');
    let storageMinutes = Number(localStorage.getItem('OTPMinutes'));
    let storageSeconds = Number(localStorage.getItem('OTPSeconds'));
    console.log('this is storageMinutes ', storageMinutes);
    console.log('this is storageSeconds ', storageSeconds);
    let isOtpVerified = localStorage.getItem('isOTPVerified')
    console.log('this is value of isOtpVerified', isOtpVerified);
    if(isOtpVerified == "true"){
      this.showTimer = false
    } else {
      this.startTimer();
    }
  }

  get control() {
    return this.forgetPasswordForm.controls;
  }

  verifyOtp() {
    console.log('hitting verify otp');

    if (this.otpControl.valid) {
      let formData = {
        userDetail: this.userDetail,
        otp: this.otpControl.value,
      };
      this.authService.verifyOtpForgetPassword(formData).subscribe({
        next: (res) => {
          console.log(res);
          if (res.code == 202) {
            alert(res.message);
            this.minutes = 0
            this.seconds = 0
            localStorage.removeItem('OTPMinutes');
            localStorage.removeItem('OTPSeconds');
            localStorage.setItem('isOTPVerified', JSON.stringify(true));
            this.router.navigate(['/auth/new-password']);
          }
        },
        error: (error) => {
          let _error = error.error;
          if (error.status == 412) {
            alert(_error.errorMessage);
          }
        },
      });
    } else {
      console.log('invalid');
    }
  }

  resendOTP() {
    if (!this.showTimer) {
      console.log('RESEND OTP');
      let data = {
        userDetail: this.userDetail,
      };
      this.authService.sendOtpForgetPassword(data).subscribe({
        next: (res) => {
          console.log(res);
          if(res.code == 200){
            alert(res.message);
            this.minutes = 2;
            this.showTimer = true;
            this.startTimer();
            localStorage.setItem('isOTPVerified', JSON.stringify(false));
          }
        },
        error: (error) => {
          let _error = error.error;
          if (error.status == 412) {
            alert(_error.errorMessage);
          }
        },
      });
    } else {
      console.log('already timer is running');
    }
  }

  goBack() {
    this.location.back();
  }

  startTimer() {
    let storageMinutes = Number(localStorage.getItem('OTPMinutes'));
    let storageSeconds = Number(localStorage.getItem('OTPSeconds'));

    if (storageMinutes > 0 || storageSeconds > 0) {
      this.seconds = storageSeconds;
      this.minutes = storageMinutes;
    }

    this.timerInterval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
        let seconds = this.seconds;
        localStorage.setItem('OTPSeconds', JSON.stringify(seconds));
        console.log('1st log');
      } else {
        if (this.minutes > 0) {
          console.log('2st log');
          this.minutes--;
          this.seconds = 59;
          let minutes = this.minutes;
          localStorage.setItem('OTPMinutes', JSON.stringify(minutes));
        } else {
          console.log('3st log');
          clearInterval(this.timerInterval);
          this.showTimer = false;
        }
      }
    }, 1000);
  }
}
