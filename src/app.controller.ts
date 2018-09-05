import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): object {
    return {
      status: 200,
      message: 'seccessful'
    }
  }
}
