import { Module } from '@nestjs/common';
import { AppController } from 'controllers/app.controller';
import { AppService } from 'services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { memberSchema } from 'schemas/member.schema';
import { AccountController } from 'controllers/account.controller';
import { DBAuthenService } from 'services/db_authen.service';
import { accessTokenSchema } from 'schemas/access-token.schema';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/member_db'),
    MongooseModule.forFeature([
      { name: 'Member', schema: memberSchema },
      { name: 'AccessToken', schema: accessTokenSchema }
    ])
  ],
  controllers: [
    AppController,
    AccountController
  ],
  providers: [
    AppService,
    DBAuthenService
  ],
})
export class AppModule { }
