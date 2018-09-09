import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { RoleAccount } from "../interfaces/app.interface";
export declare class RoleGuard implements CanActivate {
    private roles;
    constructor(...roles: RoleAccount[]);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
