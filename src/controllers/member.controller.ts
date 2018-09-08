import { Get, Controller, Post, Body, BadRequestException, UseGuards, Req, Query } from '@nestjs/common';
import { AppService } from 'services/app.service';
import { RegisterModel } from 'models/register.model';
import { ValidationPipe } from 'pipes/validation.pipe';
import { LoginModel } from 'models/login.model';
import { DBAuthenService } from 'services/db_authen.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IMemberDocument } from 'interfaces/member.interface';
import { ProfileModel } from 'models/profile.model';
import { MemberService } from 'services/member.service';
import { ChangePasswordModel } from 'models/change-password.model';
import { SearchModel } from 'models/search.model';
import { MemberModel } from 'models/member.model';


@Controller('api/member')
//@UseGuards(AuthGuard('bearer'))
@UseGuards(AuthGuard('jwt'))
export class MemberController {
    constructor(private service: MemberService) { }

    @Get('data') // แสดงข้อมูลผู้ใช้งานที่เข้าสู่ระบบ
    getUserLogin(@Req() req: Request) {
        const userLogin: IMemberDocument = req.user as any;
        userLogin.image = userLogin.image ? 'http://localhost:3000' + userLogin.image : '';
        userLogin.password = '';
        return userLogin;
    }

    @Post('profile') //แก้ไขข้อมูลส่วนตัว
    updateProfile(@Req() req: Request, @Body(new ValidationPipe()) body: ProfileModel) {
        return this.service.onUpdateProfile(req.user.id,req.user.image, body);
    }

    @Post('change-password') //เปลี่ยนรหัสผ่าน
    changePassword(@Req() req: Request, @Body(new ValidationPipe()) body: ChangePasswordModel) {
        return this.service.onChangePassword(req.user.id, body);
    }

    @Get() //แสดงข้อมูลสมาชิก
    showMember(@Query(new ValidationPipe()) query:SearchModel) {
        query.startPage = parseInt(query.startPage as any);
        query.limitPage = parseInt(query.limitPage as any);
        return this.service.getMemberItems(query);
    }

    @Post() //เพิ่มข้อมูลสมาชิก
    createMember(@Req() req: Request, @Body(new ValidationPipe()) body: MemberModel) {
      return this.service.createMemberItem(body);
    }


}