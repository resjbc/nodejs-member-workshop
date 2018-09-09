import { Model } from "mongoose";
import { IAccessTokenDocument } from "interfaces/access-token.interface";
import { IMemberDocument } from "interfaces/member.interface";
import { IAuthen } from "interfaces/authen.interface";
import { Strategy } from 'passport-http-bearer';
export declare class DBAuthenService implements IAuthen {
    private AccesTokenCollection;
    constructor(AccesTokenCollection: Model<IAccessTokenDocument>);
    genereateAccessToken(member: IMemberDocument): Promise<String>;
    validateUser(accessToken: any): Promise<IMemberDocument>;
}
declare const DBAuthenStrategy_base: new (...args: any[]) => typeof Strategy;
export declare class DBAuthenStrategy extends DBAuthenStrategy_base {
    private readonly authService;
    constructor(authService: DBAuthenService);
    validate(token: string): Promise<IMemberDocument>;
}
export {};
