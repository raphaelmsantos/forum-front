import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { HttpParams } from '@angular/common/http/src/params';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/do';
import { NotificationService } from '../services/notification.service';
import { BrokenRule } from '../models/broken-rule';
@Injectable()
export class BaseInterceptor implements HttpInterceptor {

    constructor(private notificationService: NotificationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authReq = req.clone({
            setHeaders: {
                'Authorization': `Bearer ${this.getToken()}`,
                'Content-Type': 'application/json'
              }
        });


        return next.handle(authReq);
    }

    public getToken(): string {
        return localStorage.getItem('authToken');
    }
}