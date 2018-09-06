import { IRegister } from "interfaces/app.interface";
import { IsNotEmpty, IsEmail, Matches } from "class-validator";

export class RegisterModel implements IRegister {

    @IsNotEmpty() firstname: string;

    @IsNotEmpty() lastname: string;

    @IsNotEmpty({ message:'กรุณากรอก Email'})
    @IsEmail()
    email: string;

    @IsNotEmpty() 
    @Matches(/^[A-z0-9]{6,15}$/)
    password: string;

    @IsNotEmpty()
    @Matches(/^[A-z0-9]{6,15}$/)
    cpassword: string;


}