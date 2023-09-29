import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UomService {
  
  baseUrl = `http://${window.location.hostname}:9002/api`;
  constructor(private http: HttpClient) { }


  getAllUomPageable(page: any, size: any):Observable<any>{
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/masterData/all-uoms`, {params: params});
  }

  getUomList():Observable<any>{
    return this.http.get(`${this.baseUrl}/masterData/uom`);
  }

  getUomById(id: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/masterData/uom/${id}`);
  }

  addUom(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}/masterData/uom`, data);
  }

  updateUom(id: any, data: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/masterData/uom/${id}`, data);
  }

  deleteUom(id: any):Observable<any>{
    return this.http.delete(`${this.baseUrl}/masterData/uom/${id}`);
  }

}
