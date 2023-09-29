import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  baseUrl = `http://${window.location.hostname}:9001/api`;
  constructor(private http: HttpClient) { }

  getAllTemplatePageable(page: any, size: any): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/all-messageTemplates`, {params: params});
  }

  getTemplateById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/messageTemplate/${id}`);
  }

  updateTemplateById(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/messageTemplate/${id}`, data);
  }

}
