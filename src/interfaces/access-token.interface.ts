import { Document } from "mongoose";

export interface IAccessTokenDocument extends Document {
    memberID: any,
    accessToken: String,
    exprise: Date,
    created: Date
}