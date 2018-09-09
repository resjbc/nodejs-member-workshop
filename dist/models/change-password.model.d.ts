import { IChangePassword } from "../interfaces/app.interface";
export declare class ChangePasswordModel implements IChangePassword {
    old_pass: string;
    new_pass: string;
    cnew_pass: string;
}
