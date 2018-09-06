import { Get, Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AppService } from 'services/app.service';
import { RegisterModel } from 'models/register.model';
import { ValidationPipe } from 'pipes/validation.pipe';
import { LoginModel } from 'models/login.model';
import { DBAuthenService } from 'services/db_authen.service';

@Controller('api/member')
export class MemberController {
    @Get('data') // ลงทะเบียน
    getUserLogin() {
       return '555'
    }
}