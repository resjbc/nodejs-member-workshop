import { Get, Controller, Post, Body } from '@nestjs/common';
import { AppService } from 'services/app.service';


@Controller('api/account')
export class AccountController {
    constructor(private appService: AppService) { }

    @Post('register')
    register(@Body() body) {
        return body
    }
}
