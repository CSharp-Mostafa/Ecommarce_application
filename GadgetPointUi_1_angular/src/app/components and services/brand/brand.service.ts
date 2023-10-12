import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from 'src/app/shared/models/brand';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl: string = environment.baseUrl+'/brand';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  getBrandById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl}/${id}`);
  }

  createBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, brand);
  }

  updateBrand(id: number, brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${this.apiUrl}/${id}`, brand);
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTotalBrands(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  GenerateSupplierAllPDF(): Observable<Blob> {
    return this.http.get(this.apiUrl + '/generateallpdf', {
      responseType: 'blob'
    });
  }

}










// @Injectable({
//   providedIn: 'root'
// })
// export class BrandService {
//   private brands: Brand[] = [];

//   constructor() { }

//   getAllBrands(): Brand[] {
//     return this.brands;
//   }

//   addBrand(brand: Brand): void {
//     this.brands.push(brand);
//   }
// }
