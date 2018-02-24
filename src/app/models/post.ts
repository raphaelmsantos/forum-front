import { User } from "./user";
import { Category } from "./category";

export class Post {
    public id: number;
    public title: string;
    public content: string;    
    public active: boolean;
    public categoryId: number;
    public category: Category;
    public ownerUserId: number;
    public ownerUser: User;
}