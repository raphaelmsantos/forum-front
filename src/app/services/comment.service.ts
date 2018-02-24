import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Comment } from '../models/comment';
import { PagedList } from '../models/paged-list';

@Injectable()
export class CommentService {

  private apiUrl = environment.apiUrl + "/api";

  constructor(private http: HttpClient) { }

  getAll() : Observable<PagedList> {
    return this.http.get<PagedList>(`${this.apiUrl}/category`);
  }

  getById(id: number) : Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/comment/${id}`);  
  }

  add(comment: Comment) : Observable<Comment>{
    return this.http.post<Comment>(`${this.apiUrl}/comment/`, JSON.stringify(comment));
  }

  edit(comment: Comment) : Observable<Comment>{
    return this.http.put<Comment>(`${this.apiUrl}/comment/${comment.id}`, JSON.stringify(comment));
  }
}