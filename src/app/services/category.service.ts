import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';
import { PagedList } from '../models/paged-list';

@Injectable()
export class CategoryService {

  private apiUrl = environment.apiUrl + "/api";

  constructor(private http: HttpClient) { }

  getAll() : Observable<PagedList> {
    return this.http.get<PagedList>(`${this.apiUrl}/category`);
  }

  getById(id: number) : Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/category/${id}`);  
  }

  add(category: Category) : Observable<Category>{
    return this.http.post<Category>(`${this.apiUrl}/category/`, JSON.stringify(category));
  }

  edit(category: Category) : Observable<Category>{
    return this.http.put<Category>(`${this.apiUrl}/category/${category.id}`, JSON.stringify(category));
  }
}