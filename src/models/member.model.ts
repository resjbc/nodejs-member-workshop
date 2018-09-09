import { IAccount, RoleAccount } from "interfaces/app.interface";
import { IsNotEmpty, IsEmail, Matches, IsMongoId, ValidateIf } from "class-validator";

export class CreateMemberModel implements IAccount {

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^[A-z0-9]{6,15}$/)
    password: string;

    @IsNotEmpty()
    position?: string;

    image?: string;

    @IsNotEmpty()
   // @Matches(new RegExp(`(${RoleAccount.Admin}|${RoleAccount.Employee}|${RoleAccount.Member}){1}`))
    role?: RoleAccount;

    id?: any;
    created?: Date;
    updated?: Date;


}

export class UpdateMemberModel implements IAccount {

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ValidateIf((m: UpdateMemberModel) => m.password && m.password.trim() != '')
    @Matches(/^[A-z0-9]{6,15}$/)
    password: string;

    @IsNotEmpty()
    position?: string;

    image?: string;

    @IsNotEmpty()
    role?: RoleAccount;

    id?: any;
    created?: Date;
    updated?: Date;


}

export class ParamMemberModel {
    @IsMongoId()
    @IsNotEmpty()
    id: number
}
