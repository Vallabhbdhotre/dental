import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class Root32InterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token && this.authService.isAuthenticated()) {
      const cloned = request.clone({
        headers: request.headers.append("Authorization", "Bearer " + token)
      });
      return next.handle(cloned).pipe(
        finalize(() => {}),
        catchError((err) => this.handleAuthError(err))
      );
    } else {
      return next.handle(request).pipe(
        finalize(() => {}),
        catchError((err) => this.handleAuthError(err))
      );
    }
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    console.log(err);
    //handle your auth error or rethrow
    // if (err.status === 401) {
    //   //navigate
    //   this.router.navigate(['/home']);
    //   sessionStorage.clear();
    //   return of(err.message);
    // } else if(err.status === 403){
    //   Swal.fire({
    //     titleText: "Warning",
    //     timer: 5000,
    //     text: "Logged Out due to session expiry",
    //     icon: "warning"
    //   })
    //   sessionStorage.clear();
    //   this.router.navigate(['/sign-in']);
    // }
    // else if (err.status === 0) {
    //   Swal.fire({
    //     titleText: "Warning",
    //     timer: 5000,
    //     text: "Logged Out due to session expiry",
    //     icon: "warning"
    //   })
    //   sessionStorage.clear();
    //   this.router.navigate(['/sign-in']);
    // }
    return throwError(err);
  }
}
