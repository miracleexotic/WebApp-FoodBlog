import { PostInterface } from "./IPost";
import { UserInterface } from "./IUser";

export interface CommentPostInterface {
    ID: number,
    Comment: string,
    Create_at: Date,
    Post: PostInterface,
    UserComment: UserInterface
}