import { Model } from 'mongoose';
import { IMemberDocument } from '../interfaces/member.interface';
import { IRegister, ILogin } from '../interfaces/app.interface';
import { JwtAuthenService } from './jwt-authen.service';
export declare class AppService {
    private authenService;
    private MemberCollection;
    constructor(authenService: JwtAuthenService, MemberCollection: Model<IMemberDocument>);
    onRegister(body: IRegister): Promise<IMemberDocument>;
    onLogin(body: ILogin): Promise<{
        accessToken: string;
    }>;
}
