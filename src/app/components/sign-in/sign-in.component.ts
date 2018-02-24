import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLogin } from '../../models/user-login';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { BrokenRule } from '../../models/broken-rule';
import { UserLogged } from '../../models/user-logged';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {

  private user: UserLogin = new UserLogin();

  constructor(public activeModal: NgbActiveModal, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  signIn() {
    this.notificationService.setIsLoading(true);
    this.userService.login(this.user).subscribe(
      x => {
          this.notificationService.showSuccess("User logged");
          this.userService.setUser(x);
          this.activeModal.close();
          this.notificationService.setIsLoading(false);
      },
      err => {
        let brokenRule: BrokenRule = new BrokenRule();
        brokenRule = err.error;
        this.notificationService.showError(brokenRule.message);
        this.notificationService.setIsLoading(false);
      }

    );
  }

}
