import { Get, Controller, Post } from '@nestjs/common';
import { AppService } from 'services/app.service';


@Controller()
export class AppController {
  constructor(private appService: AppService) { }

  @Get()
  root() {
    return this.appService.getItem();
  }
  /*root(): object {
    return {
      status: 200,
      message: 'seccessful Get Method'
    }
  }*/

  @Post()
  post(): void {
   this.appService.createItem();
  }
}
