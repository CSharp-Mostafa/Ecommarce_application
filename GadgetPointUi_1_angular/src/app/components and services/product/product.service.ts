import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Product } from 'src/app/shared/models/product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = environment.baseUrl+'/Product';

  private basketSource = new BehaviorSubject<Product| null>(null);
  product$ =this.basketSource.asObservable();

  constructor(private _http: HttpClient) {}


  addProduct(data: FormData): Observable<Product> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this._http.post<Product>(this.apiUrl, data,{headers});
  }


  updateProduct(id: number, data: any): Observable<any> {
    return this._http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  getProductList(): Observable<any> {
    return this._http.get<Product[]>(this.apiUrl);
  }

  deleteProduct(id: number): Observable<any> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`);
  }

  

}