import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  baseUrl = `http://${window.location.hostname}:9001/api`;


  constructor(private http: HttpClient) { }

  getAllRolesPagination(page: any, size: any): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/all-roles`, { params: params });
  }

  createRole(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/role`, data);
  }

  updateRole(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/role`, data);
  }

  getRolesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/roles`);
  }

  getRoleById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/role/${id}`);
  }

  deleteRoleById(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/role/${id}`);
  }


  getAllPermissionsPagination(page: any, size: any): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/all-permissions`, { params: params });
  }

  getPermissonList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/permissions`);
  }

  getPermissionById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/permission/${id}`);
  }

  enableDisableRole(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/role/isDeActivate/${id}?isActive=${data}`, {});
  }

}
