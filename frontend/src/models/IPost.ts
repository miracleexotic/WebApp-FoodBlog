import { UserInterface } from "./IUser";

export interface PostInterface {
    ID: number,
    Title: string,
    Subject: string,
    Image: string,
    Create_at: Date,
    Author: UserInterface
}