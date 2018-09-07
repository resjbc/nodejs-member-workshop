import { Injectable, UnauthorizedException } from "@nestjs/common";
import { generate } from "password-hash";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IAccessTokenDocument } from "interfaces/access-token.interface";
import { IMemberDocument } from "interfaces/member.interface";
import { IAuthen } from "interfaces/authen.interface";
import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';

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

    //ยืนยันผู้ใช้ที่เข้าสู่ระบบ
    async validateUser(accessToken: any): Promise<IMemberDocument> {
        try {
            const tokenItem = await this.AccesTokenCollection.findOne({ accessToken }).populate('memberID');
            if (tokenItem.exprise > new Date()) {
                return tokenItem.memberID;
            }
           
        }catch (ex){}
        return null;
    }
}

@Injectable()
export class DBAuthenStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: DBAuthenService) {
        super();
    }

    async validate(token: string) {
        const user = await this.authService.validateUser(token);
        if (!user) {
            throw new UnauthorizedException('Unauthorized please login');
        }
        return user;
    }
}