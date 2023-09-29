import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = `http://${window.location.hostname}:9002/api`;
  constructor(private http: HttpClient) { }

  getAllCategoryPageable(page: any, size: any): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/masterData/all-categories`, { params: params });
  }

  getCategoryList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/masterData/category`);
  }

  getCategoryById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/masterData/category/${id}`);
  }

  addCategory(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/masterData/category`, data);
  }

  updateCategory(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/masterData/category/${id}`, data);
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/masterData/category/${id}`);
  }

  changeStatusCategory(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/masterData/categoryStatusChange/${id}?status=${data}`, {});
  }

}
