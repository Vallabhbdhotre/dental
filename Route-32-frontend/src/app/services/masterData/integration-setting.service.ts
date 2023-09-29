import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntegrationSettingService {
  
  baseUrl = `http://${window.location.hostname}:9001/api`;
  constructor(private http: HttpClient) { }

  getAllPlatformParams(page: any, size: any):Observable<any>{
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/getTypeOfplatformParams`, {params: params});
  }

  getPlatformParamByType(type: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/platformParamByType/${type}`);
  }

  updatePlatformParamByType(type: any, data: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/updatePlatformParamsByType/${type}`, data);
  }

}
