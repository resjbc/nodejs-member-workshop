import { IAccount, RoleAccount } from "../interfaces/app.interface";
export declare class CreateMemberModel implements IAccount {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    position?: string;
    image?: string;
    role?: RoleAccount;
    id?: any;
    created?: Date;
    updated?: Date;
}
export declare class UpdateMemberModel implements IAccount {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    position?: string;
    image?: string;
    role?: RoleAccount;
    id?: any;
    created?: Date;
    updated?: Date;
}
export declare class ParamMemberModel {
    id: number;
}
