import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  baseUrl = `http://${window.location.hostname}:9002/api`;
  constructor(private http: HttpClient) { }


  getAllProductsPageable(page: any, size: any):Observable<any>{
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${this.baseUrl}/masterData/all-products`, {params: params});
  }

  getProductList():Observable<any>{
    return this.http.get(`${this.baseUrl}/masterData/product`);
  }

  getProductById(id: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/masterData/product/${id}`);
  }

  addProduct(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}/masterData/product`, data);
  }

  updateProduct(id: any, data: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/masterData/product/${id}`, data);
  }

  deleteProduct(id: any):Observable<any>{
    return this.http.delete(`${this.baseUrl}/masterData/product/${id}`);
  }

  changeStatusProduct(id:any, data: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/masterData/productStatusChange/${id}?status=${data}`, {});
  }

  deleteProductImage(productId: any, imageId: any):Observable<any>{
    return this.http.delete(`${this.baseUrl}/masterData/deleteProductImageByImageId/productId/${productId}/imageId/${imageId}`)
  }
}
