import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  ToasterModule,
  ToasterService
} from 'angular2-toaster/angular2-toaster';

import { LaddaModule } from 'angular2-ladda';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CategoryService } from './services/category.service';
import { PostService } from './services/post.service';
import { LayoutComponent } from './components/layout/layout.component';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { BaseInterceptor } from './util/base.interceptor';
import { NotificationService } from './services/notification.service';
import { LoadingComponent } from './components/loading/loading.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentService } from './services/comment.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    PostFormComponent,
    LayoutComponent,
    LoadingComponent,
    CommentFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    LaddaModule,
    ToasterModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BaseInterceptor,
    multi: true
  }, CategoryService, PostService, UserService, CommentService, NotificationService, ToasterService],
  bootstrap: [AppComponent],
  entryComponents: [SignInComponent, SignUpComponent, PostFormComponent, CommentFormComponent]
})
export class AppModule { }
