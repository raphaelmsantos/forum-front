import { User } from "./user";
import { Post } from "./post";

export class Comment {
    public id: number;
    public content: string;
    public active: boolean;

    public postId: number;
    public post: Post;
    
    public ownerUserId: number;
    public ownerUser: User;
}