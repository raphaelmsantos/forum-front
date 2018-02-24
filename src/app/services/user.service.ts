import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';
import { UserLogin } from '../models/user-login';
import { UserRegister } from '../models/user-register';
import { UserLogged } from '../models/user-logged';

@Injectable()
export class UserService {

  private loggedIn = false;
  private apiUrl = environment.apiUrl + "/api/user";

  isLogged = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('authToken');
  }

  login(userLogin: UserLogin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, JSON.stringify(userLogin));
  }

  signUp(userRegister: UserRegister) {
    return this.http.post<UserLogged>(`${this.apiUrl}/register`, userRegister);
  }

  setUser(userLogged: UserLogged) {
    localStorage.setItem('authToken', userLogged.token);
    localStorage.setItem('user', JSON.stringify(userLogged.user));
    this.isLogged.emit(true);
  }

  logout(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.isLogged.emit(false);
  }
}