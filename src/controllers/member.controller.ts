import { Get, Controller, Post, Body, BadRequestException, UseGuards, Req, Query, Param, Put, Delete } from '@nestjs/common';
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
import { ParamMemberModel, UpdateMemberModel, CreateMemberModel } from 'models/member.model';
import { RoleGuard } from 'guards/role.gurad';
import { RoleAccount } from 'interfaces/app.interface';


@Controller('api/member')
//@UseGuards(AuthGuard('bearer'))
@UseGuards(AuthGuard('jwt'))
export class MemberController {
    constructor(private service: MemberService) { }

    @Get('data') // แสดงข้อมูลผู้ใช้งานที่เข้าสู่ระบบ
    @UseGuards(new RoleGuard(RoleAccount.Admin,RoleAccount.Employee,RoleAccount.Member))
    getUserLogin(@Req() req: Request) {
        const userLogin: IMemberDocument = req.user as any;
        userLogin.image = userLogin.image ? 'http://localhost:3000' + userLogin.image : '';
        userLogin.password = '';
        return userLogin;
    }

    @Post('profile') //แก้ไขข้อมูลส่วนตัว
    @UseGuards(new RoleGuard(RoleAccount.Admin,RoleAccount.Employee,RoleAccount.Member))
    updateProfile(@Req() req: Request, @Body(new ValidationPipe()) body: ProfileModel) {
        return this.service.onUpdateProfile(req.user.id,req.user.image, body);
    }

    @Post('change-password') //เปลี่ยนรหัสผ่าน
    @UseGuards(new RoleGuard(RoleAccount.Admin,RoleAccount.Employee,RoleAccount.Member))
    changePassword(@Req() req: Request, @Body(new ValidationPipe()) body: ChangePasswordModel) {
        return this.service.onChangePassword(req.user.id, body);
    }

    @Get() //แสดงข้อมูลสมาชิก
    @UseGuards(new RoleGuard(RoleAccount.Admin,RoleAccount.Employee))
    showMember(@Query(new ValidationPipe()) query:SearchModel) {
        query.startPage = parseInt(query.startPage as any);
        query.limitPage = parseInt(query.limitPage as any);
        return this.service.getMemberItems(query);
    }

    @Post() //เพิ่มข้อมูลสมาชิก
    @UseGuards(new RoleGuard(RoleAccount.Admin))
    createMember(@Body(new ValidationPipe()) body: CreateMemberModel) {
      return this.service.createMemberItem(body);
    }

    @Get(':id') //แสดงข้อมูลสมาชิกคนเดียว
    @UseGuards(new RoleGuard(RoleAccount.Admin))
    showMemberById(@Param(new ValidationPipe()) param : ParamMemberModel){
        return this.service.getMemberItem(param.id);
    }

    @Put(':id') //แก้ไขข้อมูลสมาชิก
    @UseGuards(new RoleGuard(RoleAccount.Admin))
    updateMember(@Param(new ValidationPipe()) param : ParamMemberModel , @Body(new ValidationPipe()) body: UpdateMemberModel) {
        return this.service.updateMemberItem(param.id, body);
    }

    @Delete(':id') //ลบข้อมูลสมาชิก
    @UseGuards(new RoleGuard(RoleAccount.Admin,RoleAccount.Employee))
    deleteMember(@Param(new ValidationPipe()) param : ParamMemberModel) {
        return this.service.deleteMemberItem(param.id);
    }




}