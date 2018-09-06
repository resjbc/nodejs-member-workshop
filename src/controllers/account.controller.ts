import { Get, Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AppService } from 'services/app.service';
import { RegisterModel } from 'models/register.model';
import { ValidationPipe } from 'pipes/validation.pipe';


@Controller('api/account')
export class AccountController {
    constructor(private appService: AppService) { }

    @Post('register')
    register(@Body(new ValidationPipe()) body: RegisterModel) {
            return body;
    }
}
