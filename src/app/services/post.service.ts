import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Post } from '../models/post';
import { PagedList } from '../models/paged-list';
import { PostFilter } from '../filters/post-filter';

@Injectable()
export class PostService {

  private apiUrl = environment.apiUrl + "/api";

  constructor(private http: HttpClient) { }

  getAll() : Observable<PagedList> {
    return this.http.get<PagedList>(`${this.apiUrl}/post`);
  }

  getByFilter(filter: PostFilter) : Observable<PagedList> {
    let categoryId = filter.categoryId;
    return this.http.get<PagedList>(`${this.apiUrl}/post?categoryId=${categoryId}`);
  }

  getById(id: number) : Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/post/${id}`);  
  }

  add(post: Post) : Observable<Post>{
    return this.http.post<Post>(`${this.apiUrl}/post/`, JSON.stringify(post));
  }

  edit(post: Post) : Observable<Post>{
    return this.http.put<Post>(`${this.apiUrl}/post/${post.id}`, JSON.stringify(post));
  }
}