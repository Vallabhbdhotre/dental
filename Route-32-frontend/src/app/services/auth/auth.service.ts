import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { provideProtractorTestingSupport } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser!: Observable<any>;
  public currentUserSubject!: BehaviorSubject<any>;
  baseUrl = `http://${window.location.hostname}:9001/api`;
  
  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = sessionStorage.getItem("userData");
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currentUserSubject = new BehaviorSubject<any>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}/user-session`, data);
  }

  sendOtpForgetPassword(data: any):Observable<any> {
    return this.http.post(`${this.baseUrl}/user/otp`, data);
  }

  verifyOtpForgetPassword(data: any):Observable<any> {
    return this.http.post(`${this.baseUrl}/user/otp/verify`, data);
  }

  resetPassword(data: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/reset-password`, data);
  }

  changePassword(data: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/user-password`, data);
  }

  getAllUserPageable(page: any, size: any): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/users`, {params: params});
  }

  getUserById(id: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/user/${id}`);
  }

  addUser(data: any):Observable<any> {
    return this.http.post(`${this.baseUrl}/addUser`, data);
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateUserProfile`, data);
  }

  deleteUser(id: any):Observable<any>{
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`);
  }

  getToken() {
    let sessionStorageData = sessionStorage.getItem("userData");
    let token = "";
    if (sessionStorageData) {
      let parsedData = JSON.parse(sessionStorageData);
      if (parsedData.token) {
        return (token = parsedData.token);
      } else {
        return null;
      }
    }
  }

  isAuthenticated() {
    let sessionStorageData = sessionStorage.getItem("userData");
    let token = null;
    let parsedData;
    if (sessionStorageData) {
      parsedData = JSON.parse(sessionStorageData);
      token = parsedData.token;
    }
    if (token == null) {
      return false;
    } else {
      return true;
    }
  }

  activeInactiveUser(id: any, data: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/user/isActivate/${id}?isActive=${data}`, {});
  }

}
