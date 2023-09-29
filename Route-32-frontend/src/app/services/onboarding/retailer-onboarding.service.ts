import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetailerOnboardingService {

  baseUrl = `http://${window.location.hostname}:9003/api`;
  constructor(private http: HttpClient) { }

  addRetailer(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}/onboarding/retailer`, data);
  }

  updateRetailer(id: any, data: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/onboarding/retailer/${id}`, data);
  }

  getRetailerById(id: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/onboarding/retailer/${id}`);
  }

  getAllRetailerPageable(page: any, size: any):Observable<any>{
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/onboarding/retailers`, {params: params});
  }

  deleteRetailerById(id: any):Observable<any>{
    return this.http.delete(`${this.baseUrl}/onboarding/deleteOrg/${id}`);
  }

  retailerStatusChange(id: any, data: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/onboarding/retailer/isActivate/${id}?isActive=${data}`, {});
  }


  
}
