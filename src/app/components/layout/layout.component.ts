import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from '../sign-in/sign-in.component';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { NotificationService } from '../../services/notification.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserLogged } from '../../models/user-logged';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  private categories: Category[];

  private isLoading: boolean = false;

  private user: UserLogged = new UserLogged();

  private userIsLogged: boolean = false;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  constructor(private categoryService: CategoryService, 
    private modalService: NgbModal, 
    private notificationService: NotificationService, 
    private toasterService: ToasterService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user != undefined){
      this.userIsLogged = true;
    }

    this.notificationService.onSuccess.subscribe(
      (body: string) => this.showSuccess(body)
    );

    this.notificationService.onError.subscribe(
      (body: string) => this.showError(body)
    );

    this.notificationService.isLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );

    this.userService.isLogged.subscribe(
      (isLogged: boolean) => {
        this.userIsLogged = isLogged;
        this.user = JSON.parse(localStorage.getItem("user"));
      }
    );

  }

  openSignIn() {
    const modalRef = this.modalService.open(SignInComponent);      
  }

  openSignUp() {
    const modalRef = this.modalService.open(SignUpComponent);
  }

  showSuccess(body: string) {
    this.toasterService.pop('success', 'Success', body);
  }

  showError(body: string) {
    this.toasterService.pop('error', 'Error', body);
  }

  logout(){
    this.userService.logout();
  }

}