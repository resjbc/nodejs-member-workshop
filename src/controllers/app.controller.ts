import { Get, Controller, Post } from '@nestjs/common';
import { AppService } from 'services/app.service';


@Controller()
export class AppController {
  constructor(private appService: AppService) { }

  @Get()
  root() {
    return {
        Message: 'Hello Node Js Web api'
    }
  }
}
