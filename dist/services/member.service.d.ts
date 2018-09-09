import { IProfile, IAccount, IChangePassword, IMember, ISearch } from "interfaces/app.interface";
import { Model } from "mongoose";
import { IMemberDocument } from "../interfaces/member.interface";
export declare class MemberService {
    private MemberCollection;
    constructor(MemberCollection: Model<IMemberDocument>);
    updateMemberItem(memberID: any, body: IAccount): Promise<IMemberDocument>;
    getMemberItem(memberId: any): Promise<IMemberDocument>;
    createMemberItem(body: IAccount): Promise<IMemberDocument>;
    onUpdateProfile(memberID: any, memberImage: string, body: IProfile): Promise<IMemberDocument>;
    private convertUploadImage;
    onChangePassword(memberID: any, body: IChangePassword): Promise<any>;
    getMemberItems(searchOption: ISearch): Promise<IMember>;
    deleteMemberItem(memberID: any): Promise<any>;
}
