import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { RoleAccount, IAccount } from "../interfaces/app.interface";

@Injectable()
export class RoleGuard implements CanActivate {
    private roles: RoleAccount[];
    constructor(...roles: RoleAccount[]) {
        this.roles = roles;
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // เก็บค่า Request 
        const userLogin = context.switchToHttp().getRequest().user as IAccount;
        // ตรวจสอบว่ามี login เข้ามาหรือไม่
        if (userLogin) {
            // ค้นหาว่า User Login มี Role ตรงกับที่ กำหนดมาหรือป่าว
            const searchRoles = this.roles.filter(roles => roles === userLogin.role);
            //console.log(searchRoles);
            return searchRoles.length > 0;
        }

        return false;
    }

}