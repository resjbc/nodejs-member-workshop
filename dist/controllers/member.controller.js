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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const change_password_model_1 = require("../models/change-password.model");
const member_model_1 = require("../models/member.model");
const role_gurad_1 = require("../guards/role.gurad");
const app_interface_1 = require("../interfaces/app.interface");
const profile_model_1 = require("../models/profile.model");
const validation_pipe_1 = require("../pipes/validation.pipe");
const member_service_1 = require("../services/member.service");
const search_model_1 = require("../models/search.model");
let MemberController = class MemberController {
    constructor(service) {
        this.service = service;
    }
    getUserLogin(req) {
        const userLogin = req.user;
        userLogin.image = userLogin.image ? 'http://localhost:3000' + userLogin.image : '';
        userLogin.password = '';
        return userLogin;
    }
    updateProfile(req, body) {
        return this.service.onUpdateProfile(req.user.id, req.user.image, body);
    }
    changePassword(req, body) {
        return this.service.onChangePassword(req.user.id, body);
    }
    showMember(query) {
        query.startPage = parseInt(query.startPage);
        query.limitPage = parseInt(query.limitPage);
        return this.service.getMemberItems(query);
    }
    createMember(body) {
        return this.service.createMemberItem(body);
    }
    showMemberById(param) {
        return this.service.getMemberItem(param.id);
    }
    updateMember(param, body) {
        return this.service.updateMemberItem(param.id, body);
    }
    deleteMember(param) {
        return this.service.deleteMemberItem(param.id);
    }
};
__decorate([
    common_1.Get('data'),
    common_1.UseGuards(new role_gurad_1.RoleGuard(app_interface_1.RoleAccount.Admin, app_interface_1.RoleAccount.Employee, app_interface_1.RoleAccount.Member)),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "getUserLogin", null);
__decorate([
    common_1.Post('profile'),
    common_1.UseGuards(new role_gurad_1.RoleGuard(app_interface_1.RoleAccount.Admin, app_interface_1.RoleAccount.Employee, app_interface_1.RoleAccount.Member)),
    __param(0, common_1.Req()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_model_1.ProfileModel]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "updateProfile", null);
__decorate([
    common_1.Post('change-password'),
    common_1.UseGuards(new role_gurad_1.RoleGuard(app_interface_1.RoleAccount.Admin, app_interface_1.RoleAccount.Employee, app_interface_1.RoleAccount.Member)),
    __param(0, common_1.Req()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_model_1.ChangePasswordModel]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "changePassword", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(new role_gurad_1.RoleGuard(app_interface_1.RoleAccount.Admin, app_interface_1.RoleAccount.Employee)),
    __param(0, common_1.Query(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_model_1.SearchModel]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "showMember", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(new role_gurad_1.RoleGuard(app_interface_1.RoleAccount.Admin)),
    __param(0, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_model_1.CreateMemberModel]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "createMember", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(new role_gurad_1.RoleGuard(app_interface_1.RoleAccount.Admin)),
    __param(0, common_1.Param(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_model_1.ParamMemberModel]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "showMemberById", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(new role_gurad_1.RoleGuard(app_interface_1.RoleAccount.Admin)),
    __param(0, common_1.Param(new validation_pipe_1.ValidationPipe())), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_model_1.ParamMemberModel, member_model_1.UpdateMemberModel]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "updateMember", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(new role_gurad_1.RoleGuard(app_interface_1.RoleAccount.Admin, app_interface_1.RoleAccount.Employee)),
    __param(0, common_1.Param(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_model_1.ParamMemberModel]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "deleteMember", null);
MemberController = __decorate([
    common_1.Controller('api/member'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __metadata("design:paramtypes", [member_service_1.MemberService])
], MemberController);
exports.MemberController = MemberController;
//# sourceMappingURL=member.controller.js.map