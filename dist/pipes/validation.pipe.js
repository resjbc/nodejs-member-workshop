"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const app_interface_1 = require("../interfaces/app.interface");
let ValidationPipe = class ValidationPipe {
    transform(value, { metatype }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!metatype || !this.toValidate(metatype)) {
                return value;
            }
            const object = class_transformer_1.plainToClass(metatype, value);
            const errors = yield class_validator_1.validate(object);
            if (errors.length > 0) {
                const constraints = errors.map(m => m.constraints);
                if (constraints.length > 0) {
                    const constraint = constraints[0];
                    const message = Object.keys(constraint)
                        .map(key => constraint[key]);
                    if (message.length > 0) {
                        throw new common_1.BadRequestException(message[message.length - 1]);
                    }
                }
                throw new common_1.BadRequestException('Validation Faild.');
            }
            return value;
        });
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
};
ValidationPipe = __decorate([
    common_1.Injectable()
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;
function IsComparePassword(property, validationOptions) {
    return function (object, propertyName) {
        if (validationOptions == undefined) {
            validationOptions = {};
            validationOptions.message = 'password and confirm password do not match.';
        }
        class_validator_1.registerDecorator({
            name: "IsComparePassword",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return args.object[property] === value;
                }
            }
        });
    };
}
exports.IsComparePassword = IsComparePassword;
function IsRoleAccount(validationOptions) {
    return function (object, propertyName) {
        if (validationOptions == undefined) {
            validationOptions = {};
            validationOptions.message = 'role account do not match.';
        }
        class_validator_1.registerDecorator({
            name: "IsRoleAccount",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return app_interface_1.RoleAccount[value] != undefined;
                }
            }
        });
    };
}
exports.IsRoleAccount = IsRoleAccount;
//# sourceMappingURL=validation.pipe.js.map