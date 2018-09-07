import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IAuthen } from "interfaces/authen.interface";
import { IMemberDocument } from "interfaces/member.interface";
import { sign } from 'jsonwebtoken';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class JwtAuthenService implements IAuthen {
    constructor(@InjectModel('Member') private MemberCollection: Model<IMemberDocument>) {

    }
    //สร้าง Secret key
    public secretKey: string = 'NodeJS Member Workshop';

    async genereateAccessToken(member: IMemberDocument) {
        const payload = { email: member.email };
        return sign(payload, this.secretKey, { expiresIn: 60 * 60 });
    }

    //ยืนยันตัวตน
    async validateUser({ email }): Promise<IMemberDocument> {
        try {
            return await this.MemberCollection.findOne({ email })
        } catch (ex) { }
        return null;
    }
}

@Injectable()
export class JwtAuthenStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: JwtAuthenService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: authService.secretKey,
        });
    }

    async validate(payload: { email: string }) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new UnauthorizedException('Unauthorized please login');
        }
        return user;
    }
}