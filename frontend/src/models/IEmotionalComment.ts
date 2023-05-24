import { CommentPostInterface } from "./ICommentPost";
import { EmotionalListInterface } from "./IEmotionalList";
import { UserInterface } from "./IUser";

export interface EmotionalCommentInterface {
    ID: number,
    Comment: CommentPostInterface,
    UserComment: UserInterface,
    Emotional: EmotionalListInterface
}