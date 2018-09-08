import { Injectable, BadRequestException } from "@nestjs/common";
import { IProfile, IAccount, IChangePassword, IMember, RoleAccount, ISearch } from "interfaces/app.interface";
import { IMemberDocument } from "interfaces/member.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BASE_DIR } from "main";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { verify, generate } from "password-hash";

@Injectable()
export class MemberService {
    constructor(@InjectModel('Member') private MemberCollection: Model<IMemberDocument>) {
        /*const members: IAccount[] = [];
            for (let i = 0; i <= 100; i++){
                members.push({
                    firstname: `firstname ${i}`,
                    lastname: `lastname ${i}`,
                    email: `email${i}@mail.com`,
                    password: generate(`password-${i}`),
                    image: '',
                    position: '',
                    role: RoleAccount.Member
                });
            }*/

        //this.MemberCollection.create(members, ( err => console.log(err)))
    }

    // แก้ไขข้อมูลโปรไฟล์
    async onUpdateProfile(memberID: any, memberImage: string, body: IProfile) {

        //สำหรับถ้ารูปเป็น null
        /*const member  = body;
        if(!member.image) delete member.image;
        else member.image = this.convertUploadImage(memberID,member.image); 
        member['updated'] =  new Date();*/

        const updated = await this.MemberCollection.update({ _id: memberID }, <IAccount>{
            firstname: body.firstname,
            lastname: body.lastname,
            image: body.image.replace('http://localhost:3000', '') != memberImage ? this.convertUploadImage(memberID, body.image) : memberImage,
            position: body.position,
            updated: new Date()
        });
        if (!updated.ok) throw new BadRequestException('ข้อมูลไม่มีการเปลี่ยนแปลง');
        const memberItem = await this.MemberCollection.findById(memberID);
        //const memberItem = await this.MemberCollection.findById(memberID, { password: false});
        memberItem.image = memberItem.image ? 'http://localhost:3000' + memberItem.image + '?ver=' + Math.random() : '';
        memberItem.password = '';
        return memberItem;

    }

    //แปลงรูปภาพจาก Base64 เป็น ไฟล์
    private convertUploadImage(memberID, image: string) {
        try {
            //สร้างโฟลเดอร์ใหม่
            const uploadDir = BASE_DIR + '/uploads';
            if (!existsSync(uploadDir)) mkdirSync(uploadDir);
            const ext = image.split(';')[0].match(/jpeg|jpg|png|gif/)[0];
            const data_img = image.replace(/^data:image\/\w+;base64,/, "");
            const buf = new Buffer(data_img, 'base64');
            const fileName = `${uploadDir}/${memberID}.${ext}`;
            writeFileSync(fileName, buf);
            return fileName.replace(BASE_DIR, '');
            //ตรวจสอบว่าเป็นชนิด .jpg
            /*const imageTypes = ['jpeg', 'png'];
            if (image.indexOf(imageTypes[0]) > 0 || image.indexOf(imageTypes[1]) > 0) {
                const fileType = image.search(imageTypes[0]) > 0 ? 'jpg' : 'png';
                const fileName = `${uploadDir}/${memberID}.${fileType}`;
                writeFileSync(fileName, new Buffer(image.replace(`data:image/${fileType};base64,`, ''), 'base64'));
                return fileName.replace(BASE_DIR, '');
            } else return { message: 'อัพโหลดไฟล์รูปภาพเท่านั้น' };*/

        } catch (ex) {
            throw new BadRequestException(ex.message);
        }

    }

    //เปลี่ยนรหัสผ่าน
    async onChangePassword(memberID: any, body: IChangePassword) {
        const memberItem = await this.MemberCollection.findById(memberID);
        if (!verify(body.old_pass, memberItem.password))
            throw new BadRequestException('หรัสผ่านเดิมไม่ถูกต้อง');
        const updated = await this.MemberCollection.update({ _id: memberID }, <IAccount>{
            password: generate(body.new_pass),
            updated: new Date()
        });

        return updated;
    }

    //แสดงข้อมูลสมาชิก
    async getMemberItems(searchOption: ISearch) {

        //ค้นหาและแบ่งหน้า page
        const items = await this.MemberCollection
            .find({}, { image: false })
            .sort({ updated: -1 })
            .skip((searchOption.startPage - 1) * searchOption.limitPage)
            .limit(searchOption.limitPage);

        //หาผลรวมหน้า page ทั้งหมด
        const totalItems = await this.MemberCollection.count({});
        return <IMember>{
            items,
            totalItems
        };
    }
}
