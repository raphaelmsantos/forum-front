import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { PostFormComponent } from '../post-form/post-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { UserLogged } from '../../models/user-logged';
import { Token } from '@angular/compiler';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  private categories: Category[];
  private posts: Post[] = new Array<Post>();
  private category: Category = new Category();

  private userIsLogged: boolean = false;

  private userLogged: User;

  constructor(private postService: PostService,
    private categoryService: CategoryService,
    private userService: UserService,
    private notificationService: NotificationService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getPosts(0);
    this.getCategories();
    this.category.id = 0;
    
    this.userLogged = JSON.parse(localStorage.getItem("user"));
    if(this.userLogged != undefined){
      this.userIsLogged = true;
    }

    this.userService.isLogged.subscribe(
      (isLogged: boolean) => {
        this.userIsLogged = isLogged
        this.userLogged = JSON.parse(localStorage.getItem("user"));
      }
    );
  }

  getCategories() {
    this.notificationService.setIsLoading(true);
    this.categoryService.getAll().subscribe(
      x => {
        this.categories = x.items;
        this.notificationService.setIsLoading(false);
      }
    );
  }

  getPosts(id: number) {
    this.notificationService.setIsLoading(true);
    let filter = {
      categoryId : id
    };
    this.postService.getByFilter(filter).subscribe(
      x => {
        this.posts = x.items;
        this.notificationService.setIsLoading(false);
      }
    )
  }

  openPost(id: number) {
    if (this.userIsLogged) {
      const modalRef = this.modalService.open(PostFormComponent);
      modalRef.componentInstance.id = id;
      modalRef.result.then((result) => {
          this.getPosts(this.category.id);
        });
    } else {
      this.notificationService.showError("Please, sign in.");
    }
  }

  openComment(postId: number, id: number) {
    if (this.userIsLogged) {
      const modalRef = this.modalService.open(CommentFormComponent);
      modalRef.componentInstance.postId = postId;
      modalRef.componentInstance.id = id;
      modalRef.result.then((result) => {
        this.getPosts(this.category.id);
      });
    } else {
      this.notificationService.showError("Please, sign in.");
    }
  }

  filterPosts(id){
    this.getPosts(id);
  }

}