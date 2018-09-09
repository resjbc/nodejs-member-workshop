import { IAuthen } from "interfaces/authen.interface";
import { IMemberDocument } from "interfaces/member.interface";
import { Strategy } from 'passport-jwt';
import { Model } from "mongoose";
export declare class JwtAuthenService implements IAuthen {
    private MemberCollection;
    constructor(MemberCollection: Model<IMemberDocument>);
    secretKey: string;
    genereateAccessToken(member: IMemberDocument): Promise<string>;
    validateUser({ email }: {
        email: any;
    }): Promise<IMemberDocument>;
}
declare const JwtAuthenStrategy_base: new (...args: any[]) => typeof Strategy;
export declare class JwtAuthenStrategy extends JwtAuthenStrategy_base {
    private readonly authService;
    constructor(authService: JwtAuthenService);
    validate(payload: {
        email: string;
    }): Promise<IMemberDocument>;
}
export {};
