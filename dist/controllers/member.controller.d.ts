import { Request } from 'express';
import { IMemberDocument } from '../interfaces/member.interface';
import { ChangePasswordModel } from '../models/change-password.model';
import { ParamMemberModel, UpdateMemberModel, CreateMemberModel } from '../models/member.model';
import { ProfileModel } from '../models/profile.model';
import { MemberService } from '../services/member.service';
import { SearchModel } from '../models/search.model';
export declare class MemberController {
    private service;
    constructor(service: MemberService);
    getUserLogin(req: Request): IMemberDocument;
    updateProfile(req: Request, body: ProfileModel): Promise<IMemberDocument>;
    changePassword(req: Request, body: ChangePasswordModel): Promise<any>;
    showMember(query: SearchModel): Promise<import("interfaces/app.interface").IMember>;
    createMember(body: CreateMemberModel): Promise<IMemberDocument>;
    showMemberById(param: ParamMemberModel): Promise<IMemberDocument>;
    updateMember(param: ParamMemberModel, body: UpdateMemberModel): Promise<IMemberDocument>;
    deleteMember(param: ParamMemberModel): Promise<any>;
}
