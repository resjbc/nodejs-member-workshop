import { RegisterModel } from '../models/register.model';
import { AppService } from '../services/app.service';
import { LoginModel } from '../models/login.model';
export declare class AccountController {
    private service;
    constructor(service: AppService);
    register(body: RegisterModel): Promise<import("interfaces/member.interface").IMemberDocument>;
    login(body: LoginModel): Promise<{
        accessToken: string;
    }>;
}
