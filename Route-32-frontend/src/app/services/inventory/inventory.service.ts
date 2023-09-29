import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  baseUrl = `http://${window.location.hostname}:9002/api`;
  constructor(private http: HttpClient) { }


  getAllAdminStockPageable(page: any, size: any): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/inventory/admin`, { params: params });
  }

  getAllRetailerStockPageable(page: any, size: any):Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/inventory/retailer`, {params: params});
  }

  createRequestStock(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/inventory/request`, data);
  }

  getRequestById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/inventory/request/${id}`);
  }

  sendRequestPageable(page: any, size: any): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/inventory/sentRequests`, { params: params });
  }

  recievedRequestPageable(page: any, size: any): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/inventory/recievedRequests`, { params: params });
  }

  changeRequestStatus(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/inventory/changeStatus/${id}/${data}`, {});
  }

  adminStockOutWardPageable(page: any, size: any): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/inventory/admin/all-outward`, { params: params });
  }

  createCase():Observable<Blob>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.baseUrl}/inventory/case`,{}, {headers: headers, responseType: 'blob'} );
  }

  retailerInwardStockPageable(page: any, size: any):Observable<any>{
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/inventory/retailer/inwardList`, {params: params});
  }

  getRetailerWiseInventoryAdmin(page: any, size: any):Observable<any>{
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/inventory/admin/retailerWiseInventory`, {params: params});
  }

  adminStockInWardPageable(page: any, size: any):Observable<any>{
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/inventory/admin/all-inwards`, {params: params});
  }

}
