import { Injectable, BadRequestException } from "@nestjs/common";
import { IProfile, IAccount, IChangePassword, IMember, RoleAccount, ISearch } from "interfaces/app.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { verify, generate } from "password-hash";
import { IMemberDocument } from "../interfaces/member.interface";
import { BASE_DIR } from "../main";

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

    //แก้ไขข้อมูลสมาชิก
    async updateMemberItem(memberID: any, body: IAccount) {
        const memberUpdate = await this.MemberCollection.findById(memberID);
        if (!memberUpdate) throw new BadRequestException('ไม่มีข้อมูลนี้ในระบบ');

        /*const memberItemCount = await this.MemberCollection.count({email:body.email});
        if(memberItem.email != body.email && memberItemCount > 0)
        throw new BadRequestException('มีอีมล์นี้ในระบบแล้ว');*/

        try {
            memberUpdate.email = body.email;
            memberUpdate.firstname = body.firstname;
            memberUpdate.lastname = body.lastname;

            if (body.image && body.image.trim() != '')
                if (body.image.replace('http://localhost:3000', '').split('?')[0] != memberUpdate.image) {
                    this.convertUploadImage(memberID, body.image)
                }


            memberUpdate.position = body.position;
            memberUpdate.role = body.role;
            memberUpdate.updated = new Date();
            //ตรวจสอบการเปลี่ยนรหัสผ่าน
            if (body.password && body.password.trim() != '')
                memberUpdate.password = generate(body.password);

            const updated = await this.MemberCollection.update({ _id: memberID }, memberUpdate);
            if (!updated.ok) throw new BadRequestException('ไม่สามารแก้ไขข้อมูลได้');

            const memberUpdated = await this.MemberCollection.findById(memberID, { password: false });
            memberUpdated.image = memberUpdated.image ? 'http://localhost:3000' + memberUpdated.image + '?ver=' + Math.random() : '';
            return memberUpdated;

        } catch (ex) {
            throw new BadRequestException(ex.message);
        }


    }

    //แสดงข้อมูงสมาชิกคนเดียว
    async getMemberItem(memberId: any) {
        const memberItem = await this.MemberCollection.findById(memberId, { password: false });
        memberItem.image = memberItem.image ? 'http://localhost:3000' + memberItem.image + '?ver=' + Math.random() : '';
        return memberItem;
    }

    //สร้างข้อมูลสมาชิก
    async createMemberItem(body: IAccount) {
        const count = await this.MemberCollection.count({ email: body.email });

        if (count > 0) throw new BadRequestException('มีอีเมล์นี้ในระบบแล้ว');

        body.password = generate(body.password);
        let image = body.image
        body.image = '';
        let memberCreated = await this.MemberCollection.create(body);
        image = image ? this.convertUploadImage(memberCreated.id, image) : '';
        memberCreated.image = image;
        await this.MemberCollection.update({ _id: memberCreated.id }, memberCreated);
        memberCreated.password = '';

        return memberCreated;
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
    private convertUploadImage(memberID: any, image: string) {
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
    async getMemberItems(searchOption: ISearch): Promise<IMember> {

        let queryItemFunction = () => this.MemberCollection.find({}, { image: false });

        //ส่วนของการค้นหา
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
                    /*queryItemFunction = () => this.MemberCollection.find({
                        updated: {
                            $gt: text['from'],
                            $lt: text['to']
                        }
                    }, { image: false })*/
                    queryItemFunction = () => this.MemberCollection
                        .find({}, { image: false })
                        .where('updated')
                        .gt(text['from'])
                        .lt(text['to'])
                    break;
                default:
                    conditions[type] = new RegExp(text, 'i');
                    queryItemFunction = () => this.MemberCollection.find(conditions, { image: false });
                    break;
            }


        }

        //ค้นหาและแบ่งหน้า page
        const items = await queryItemFunction()
            .sort({ updated: -1 })
            .skip((searchOption.startPage - 1) * searchOption.limitPage)
            .limit(searchOption.limitPage);

        //ผลรวมหน้า page ทั้งหมด
        const totalItems = await queryItemFunction().count({});
        return <IMember>{ items, totalItems };
    }

    //ลบข้อมูลสมาชิก
    async deleteMemberItem(memberID: any) {
        return await this.MemberCollection.remove({_id: memberID});
    }


}
