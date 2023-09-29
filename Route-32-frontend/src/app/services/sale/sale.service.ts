import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  baseUrl = `http://${window.location.hostname}:9002/api`;
  constructor(private http: HttpClient) { }

  getSalesPageable(page: any, size: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/sale/all-sales`);
  }

  getSaleById(id: any):Observable<any> {
    return this.http.get(`${this.baseUrl}/sale/${id}`);
  }

}
