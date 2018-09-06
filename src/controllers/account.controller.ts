import { Get, Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AppService } from 'services/app.service';
import { RegisterModel } from 'models/register.model';
import { ValidationPipe } from 'pipes/validation.pipe';
import { LoginModel } from 'models/login.model';


@Controller('api/account')
export class AccountController {
    constructor(private service: AppService) { }

    @Post('register') // ลงทะเบียน
    register(@Body(new ValidationPipe()) body: RegisterModel) {
        return this.service.onRegister(body);
    }

    @Post('login') // เข้าสู่ระบบ
    login(@Body(new ValidationPipe()) body: LoginModel) {
       return this.service.onLogin(body);
    }
}
