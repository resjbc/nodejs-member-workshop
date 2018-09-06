import { Injectable } from "@nestjs/common";
import { IAuthen } from "interfaces/authen.interface";
import { IMemberDocument } from "interfaces/member.interface";
import { sign } from 'jsonwebtoken';

@Injectable()
export class JwtAuthenService implements IAuthen {

    private secretKey: string = 'NodeJS Member Workshop';

    async genereateAccessToken(member: IMemberDocument) {
        const payload = { email: member.email };
        return sign(payload, this.secretKey, { expiresIn: 60 * 60 });
    }
}