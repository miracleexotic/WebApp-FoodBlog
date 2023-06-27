import { UserInterface } from "./IUser";
import { CategoryInterface } from "./ICategory";

export interface PostInterface {
    ID: number,
    Title: string,
    Preview: string,
    Subject: string,
    Image: string,
    Lat: number,
    Lng: number,
    Create_at: Date,
    Author: UserInterface,
    Category: CategoryInterface
}

export interface PostWithLikeCountInterface {
    Post: PostInterface,
    Count: number
}