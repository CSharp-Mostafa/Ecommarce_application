import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl: string = environment.baseUrl+'/category';
  constructor(private http: HttpClient) { }
  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  createCategory(sup: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, sup);
  }

  updateCategory(id: number, sup: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, sup);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
