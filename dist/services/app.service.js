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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const app_interface_1 = require("../interfaces/app.interface");
const password_hash_1 = require("password-hash");
const jwt_authen_service_1 = require("./jwt-authen.service");
let AppService = class AppService {
    constructor(authenService, MemberCollection) {
        this.authenService = authenService;
        this.MemberCollection = MemberCollection;
    }
    onRegister(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.MemberCollection.count({ email: body.email });
            if (count > 0)
                throw new common_1.BadRequestException('มีอีเมล์นี้ในระบบแล้ว');
            delete body.cpassword;
            const model = body;
            model.password = password_hash_1.generate(model.password);
            model.image = '';
            model.position = '';
            model.role = app_interface_1.RoleAccount.Member;
            const modelItem = yield this.MemberCollection.create(model);
            modelItem.password = '';
            return modelItem;
        });
    }
    onLogin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield this.MemberCollection.findOne({ email: body.email });
            if (!member)
                throw new common_1.BadRequestException('ไม่มีผู้ใช้งานนี้ในระบบ');
            if (password_hash_1.verify(body.password, member.password)) {
                return { accessToken: yield this.authenService.genereateAccessToken(member) };
            }
            throw new common_1.BadRequestException('อีเมล์หรือรหัสผ่านไม่ถูกต้อง');
        });
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_1.InjectModel('Member')),
    __metadata("design:paramtypes", [jwt_authen_service_1.JwtAuthenService,
        mongoose_2.Model])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map