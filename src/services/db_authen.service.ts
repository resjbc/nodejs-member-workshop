import { Injectable } from "@nestjs/common";
import { generate } from "password-hash";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IAccessTokenDocument } from "interfaces/access-token.interface";
import { IMemberDocument } from "interfaces/member.interface";
import { IAuthen } from "interfaces/authen.interface";

@Injectable()
export class DBAuthenService implements IAuthen {
    constructor(
        @InjectModel('AccessToken') private AccesTokenCollection: Model<IAccessTokenDocument>
    ) { }

    //สร้าง Token
    async genereateAccessToken(member: IMemberDocument) {
        const model = {
            memberID: member._id,
            accessToken: generate(Math.random().toString()),
            exprise: new Date().setMinutes(new Date().getMinutes() + 30)
        }
        const token = await this.AccesTokenCollection.create(model);
        return token.accessToken;
    }
}