import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRegister } from '../../models/user-register';
import { UserService } from '../../services/user.service';
import { BrokenRule } from '../../models/broken-rule';
import { NotificationService } from '../../services/notification.service';
import { forEach } from '@angular/router/src/utils/collection';
import { UserLogged } from '../../models/user-logged';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

  private user: UserRegister = new UserRegister()

  constructor(public activeModal: NgbActiveModal, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  signUp() {
    this.notificationService.setIsLoading(true);
    this.userService.signUp(this.user).subscribe(
      x => {
        this.notificationService.showSuccess("User registered");
        this.userService.setUser(x);
          this.activeModal.close();
          this.notificationService.setIsLoading(false);
      }, err => {
        let brokenRule: BrokenRule = new BrokenRule();
        brokenRule = err.error;

        if (brokenRule.fields.length > 0) {
          for (let i = 0; i <= brokenRule.fields.length; i++) {
            let field = brokenRule.fields[i];
            this.notificationService.showError(field.message);
          }
          this.activeModal.close();
        } else {
          this.notificationService.showError(brokenRule.message);
        }
        this.notificationService.setIsLoading(false);
      }
    )
  }
}