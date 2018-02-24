import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLogin } from '../../models/user-login';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { BrokenRule } from '../../models/broken-rule';
import { UserLogged } from '../../models/user-logged';

import { Comment } from '../../models/comment';
import { CommentService } from '../../services/comment.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html'
})
export class CommentFormComponent implements OnInit {

  @Input() postId: number;
  @Input() id: number;

  private comment: Comment = new Comment();

  constructor(public activeModal: NgbActiveModal, private notificationService: NotificationService, private commentService: CommentService) { }

  ngOnInit() {
    let userLogged: User = JSON.parse(localStorage.getItem("user"));
    this.comment.ownerUserId = userLogged.id;
    this.comment.postId = this.postId;

    if (this.id > 0) {
      this.getCommentById(this.id);
    }
  }

  save() {
    this.notificationService.setIsLoading(true);
    if (this.comment.id == 0) {
      this.commentService.add(this.comment).subscribe(
        x => {
          this.notificationService.showSuccess('Comment saved');
          this.activeModal.close();
          this.notificationService.setIsLoading(false);
        },
        err => {
          this.notificationService.showError('Error');
          this.notificationService.setIsLoading(false);
        }
      );
    } else {
      this.commentService.edit(this.comment).subscribe(
        x => {
          this.notificationService.showSuccess('Comment saved');
          this.activeModal.close();
          this.notificationService.setIsLoading(false);
        },
        err => {
          this.notificationService.showError('Error');
          this.notificationService.setIsLoading(false);
        }
      );
    }
  }

  getCommentById(id: number) {
    this.notificationService.setIsLoading(true);
    this.commentService.getById(id).subscribe(
      x => {
        this.comment = x;
        this.notificationService.setIsLoading(false);
      }
    );
  }
}