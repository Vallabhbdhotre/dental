import { AnimationBuilder } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  baseUrl = `http://${window.location.hostname}:9002/api`;
  constructor(private http: HttpClient) { }

  getAllPurchaseOrderPageable(page: any, size: any):Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/purchaseOrder/all-purchaseOrders`, {params: params});
  }

  addPurchaseOrder(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}/purchaseOrder/create`, data);
  }

  getPurchaseOrderById(id: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/purchaseOrder/${id}`)
  }


}
