import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLogin } from '../../models/user-login';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { BrokenRule } from '../../models/broken-rule';
import { UserLogged } from '../../models/user-logged';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html'
})
export class PostFormComponent implements OnInit {

  @Input() id: number;

  private categories: Category[];
  private post: Post = new Post();

  constructor(public activeModal: NgbActiveModal, private notificationService: NotificationService, private categoryService: CategoryService, private postService: PostService) { }

  ngOnInit() {
    let userLogged: User = JSON.parse(localStorage.getItem("user"));
    this.post.ownerUserId = userLogged.id;
    this.getCategories();

    if (this.id > 0) {
      this.getPostById(this.id);
    }
  }

  getCategories() {
    this.notificationService.setIsLoading(true);
    this.categoryService.getAll().subscribe(
      x => {
        this.categories = x.items;
        this.notificationService.setIsLoading(false);
      }
    )
  }

  save() {
    this.notificationService.setIsLoading(true);
    if (this.post.id == 0) {
      this.postService.add(this.post).subscribe(
        x => {
          this.notificationService.showSuccess('Post saved');
          this.activeModal.close();
          this.notificationService.setIsLoading(false);
        },
        err => {
          this.notificationService.showError('Error');
          this.notificationService.setIsLoading(false);
        }
      );
    } else {
      this.postService.edit(this.post).subscribe(
        x => {
          this.notificationService.showSuccess('Post saved');
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

  getPostById(id: number) {
    this.postService.getById(id).subscribe(
      x => {
        this.post = x
      }
    );
  }
}