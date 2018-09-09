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
const fs_1 = require("fs");
const password_hash_1 = require("password-hash");
const main_1 = require("../main");
let MemberService = class MemberService {
    constructor(MemberCollection) {
        this.MemberCollection = MemberCollection;
    }
    updateMemberItem(memberID, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const memberUpdate = yield this.MemberCollection.findById(memberID);
            if (!memberUpdate)
                throw new common_1.BadRequestException('ไม่มีข้อมูลนี้ในระบบ');
            try {
                memberUpdate.email = body.email;
                memberUpdate.firstname = body.firstname;
                memberUpdate.lastname = body.lastname;
                if (body.image && body.image.trim() != '')
                    if (body.image.replace('http://localhost:3000', '').split('?')[0] != memberUpdate.image) {
                        this.convertUploadImage(memberID, body.image);
                    }
                memberUpdate.position = body.position;
                memberUpdate.role = body.role;
                memberUpdate.updated = new Date();
                if (body.password && body.password.trim() != '')
                    memberUpdate.password = password_hash_1.generate(body.password);
                const updated = yield this.MemberCollection.update({ _id: memberID }, memberUpdate);
                if (!updated.ok)
                    throw new common_1.BadRequestException('ไม่สามารแก้ไขข้อมูลได้');
                const memberUpdated = yield this.MemberCollection.findById(memberID, { password: false });
                memberUpdated.image = memberUpdated.image ? 'http://localhost:3000' + memberUpdated.image + '?ver=' + Math.random() : '';
                return memberUpdated;
            }
            catch (ex) {
                throw new common_1.BadRequestException(ex.message);
            }
        });
    }
    getMemberItem(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const memberItem = yield this.MemberCollection.findById(memberId, { password: false });
            memberItem.image = memberItem.image ? 'http://localhost:3000' + memberItem.image + '?ver=' + Math.random() : '';
            return memberItem;
        });
    }
    createMemberItem(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.MemberCollection.count({ email: body.email });
            if (count > 0)
                throw new common_1.BadRequestException('มีอีเมล์นี้ในระบบแล้ว');
            body.password = password_hash_1.generate(body.password);
            let image = body.image;
            body.image = '';
            let memberCreated = yield this.MemberCollection.create(body);
            image = image ? this.convertUploadImage(memberCreated.id, image) : '';
            memberCreated.image = image;
            yield this.MemberCollection.update({ _id: memberCreated.id }, memberCreated);
            memberCreated.password = '';
            return memberCreated;
        });
    }
    onUpdateProfile(memberID, memberImage, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield this.MemberCollection.update({ _id: memberID }, {
                firstname: body.firstname,
                lastname: body.lastname,
                image: body.image.replace('http://localhost:3000', '') != memberImage ? this.convertUploadImage(memberID, body.image) : memberImage,
                position: body.position,
                updated: new Date()
            });
            if (!updated.ok)
                throw new common_1.BadRequestException('ข้อมูลไม่มีการเปลี่ยนแปลง');
            const memberItem = yield this.MemberCollection.findById(memberID);
            memberItem.image = memberItem.image ? 'http://localhost:3000' + memberItem.image + '?ver=' + Math.random() : '';
            memberItem.password = '';
            return memberItem;
        });
    }
    convertUploadImage(memberID, image) {
        try {
            const uploadDir = main_1.BASE_DIR + '/uploads';
            if (!fs_1.existsSync(uploadDir))
                fs_1.mkdirSync(uploadDir);
            const ext = image.split(';')[0].match(/jpeg|jpg|png|gif/)[0];
            const data_img = image.replace(/^data:image\/\w+;base64,/, "");
            const buf = new Buffer(data_img, 'base64');
            const fileName = `${uploadDir}/${memberID}.${ext}`;
            fs_1.writeFileSync(fileName, buf);
            return fileName.replace(main_1.BASE_DIR, '');
        }
        catch (ex) {
            throw new common_1.BadRequestException(ex.message);
        }
    }
    onChangePassword(memberID, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const memberItem = yield this.MemberCollection.findById(memberID);
            if (!password_hash_1.verify(body.old_pass, memberItem.password))
                throw new common_1.BadRequestException('หรัสผ่านเดิมไม่ถูกต้อง');
            const updated = yield this.MemberCollection.update({ _id: memberID }, {
                password: password_hash_1.generate(body.new_pass),
                updated: new Date()
            });
            return updated;
        });
    }
    getMemberItems(searchOption) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryItemFunction = () => this.MemberCollection.find({}, { image: false });
            if (searchOption.searchText && searchOption.searchType) {
                const text = searchOption.searchText;
                const type = searchOption.searchType;
                const conditions = {};
                switch (type) {
                    case 'role':
                        conditions[type] = text;
                        queryItemFunction = () => this.MemberCollection.find(conditions, { image: false });
                        break;
                    case 'updated':
                        queryItemFunction = () => this.MemberCollection
                            .find({}, { image: false })
                            .where('updated')
                            .gt(text['from'])
                            .lt(text['to']);
                        break;
                    default:
                        conditions[type] = new RegExp(text, 'i');
                        queryItemFunction = () => this.MemberCollection.find(conditions, { image: false });
                        break;
                }
            }
            const items = yield queryItemFunction()
                .sort({ updated: -1 })
                .skip((searchOption.startPage - 1) * searchOption.limitPage)
                .limit(searchOption.limitPage);
            const totalItems = yield queryItemFunction().count({});
            return { items, totalItems };
        });
    }
    deleteMemberItem(memberID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.MemberCollection.remove({ _id: memberID });
        });
    }
};
MemberService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Member')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MemberService);
exports.MemberService = MemberService;
//# sourceMappingURL=member.service.js.map