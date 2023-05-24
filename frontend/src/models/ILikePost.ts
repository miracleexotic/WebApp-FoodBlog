import { PostInterface } from "./IPost";
import { UserInterface } from "./IUser";

export interface LikePostInterface {
    ID: number,
    Post: PostInterface,
    UserLike: UserInterface
}