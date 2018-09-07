import { Get, Controller, Post, Body, BadRequestException, UseGuards, Req } from '@nestjs/common';
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


@Controller('api/member')
//@UseGuards(AuthGuard('bearer'))
@UseGuards(AuthGuard('jwt'))
export class MemberController {
constructor(private service: MemberService) {}

    @Get('data') // ลงทะเบียน
    getUserLogin(@Req() req:Request) {
       const userLogin: IMemberDocument =  req.user as any;
       userLogin.password = '';
       return userLogin;
    }

    @Post('profile')
    updateProfile(@Req() req:Request, @Body(new ValidationPipe()) body: ProfileModel) {
        return this.service.onUpdateProfile(req.user.id, body);
    }

}