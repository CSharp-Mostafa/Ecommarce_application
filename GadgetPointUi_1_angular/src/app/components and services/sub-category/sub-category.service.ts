import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { SubCategory } from 'src/app/shared/models/sub-category';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  apiUrl: string = environment.baseUrl+'/subcategory';

constructor(private http: HttpClient) { }

getSubCategory(): Observable<SubCategory[]> {
  return this.http.get<SubCategory[]>(this.apiUrl);
}

getSubCategoryById(id: number): Observable<SubCategory> {
  return this.http.get<SubCategory>(`${this.apiUrl}/${id}`);
}

createSubCategory(sup: SubCategory): Observable<SubCategory> {
  return this.http.post<SubCategory>(this.apiUrl, sup);
}

updateSubCategory(id: number, sup: SubCategory): Observable<SubCategory> {
  return this.http.put<SubCategory>(`${this.apiUrl}/${id}`, sup);
}

deleteSubCategory(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}
