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
const class_validator_1 = require("class-validator");
const validation_pipe_1 = require("../pipes/validation.pipe");
class RegisterModel {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterModel.prototype, "firstname", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterModel.prototype, "lastname", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'กรุณากรอก Email' }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], RegisterModel.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Matches(/^[A-z0-9]{6,15}$/),
    __metadata("design:type", String)
], RegisterModel.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    validation_pipe_1.IsComparePassword('password'),
    __metadata("design:type", String)
], RegisterModel.prototype, "cpassword", void 0);
exports.RegisterModel = RegisterModel;
//# sourceMappingURL=register.model.js.map