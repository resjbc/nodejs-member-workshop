import { Injectable, BadRequestException } from "@nestjs/common";
import { IProfile, IAccount } from "interfaces/app.interface";
import { IMemberDocument } from "interfaces/member.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class MemberService   {
    constructor(@InjectModel('Member') private MemberCollection: Model<IMemberDocument>){}

    // แก้ไขข้อมูลโปรไฟล์
    async onUpdateProfile(memberID: any, body: IProfile){
        const updated = await this.MemberCollection.update({_id: memberID},<IAccount>{
            firstname: body.firstname,
            lastname: body.lastname,
            image: body.image,
            position: body.position,
            updated: new Date()
        });
        if (!updated.ok) throw new BadRequestException('ข้อมูลไม่มีการเปลี่ยนแปลง');
        const memberItem =  await this.MemberCollection.findById(memberID);
        memberItem.password = '';
        return memberItem;
    }
}
