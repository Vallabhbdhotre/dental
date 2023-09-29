import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  baseUrl = `http://${window.location.hostname}:9002/api`;
  constructor(private http: HttpClient) { }

  getAllManufacturerPageable(page: any, size: any):Observable<any>{
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/masterData/all-manufacturers`, {params: params});
  }

  getManufacturerList():Observable<any>{
    return this.http.get(`${this.baseUrl}/masterData/manufacturer`);
  }

  getManufacturerById(id: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/masterData/manufacturer/${id}`);
  }

  addManufacturer(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}/masterData/manufacturer`, data);
  }

  updateManufacturer(id: any, data: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/masterData/manufacturer/${id}`, data);
  }

}
