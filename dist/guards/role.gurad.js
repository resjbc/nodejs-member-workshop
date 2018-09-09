"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_interface_1 = require("../interfaces/app.interface");
let RoleGuard = class RoleGuard {
    constructor(...roles) {
        this.roles = roles;
    }
    canActivate(context) {
        const userLogin = context.switchToHttp().getRequest().user;
        if (userLogin) {
            const searchRoles = this.roles.filter(roles => roles === userLogin.role);
            return searchRoles.length > 0;
        }
        return false;
    }
};
RoleGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Number])
], RoleGuard);
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role.gurad.js.map