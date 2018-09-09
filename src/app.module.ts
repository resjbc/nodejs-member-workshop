import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './controllers/account.controller';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { memberSchema } from './schemas/member.schema';
import { accessTokenSchema } from './schemas/access-token.schema';
import { MemberController } from './controllers/member.controller';
import { MemberService } from './services/member.service';
import { DBAuthenService, DBAuthenStrategy } from './services/db_authen.service';
import { JwtAuthenService, JwtAuthenStrategy } from './services/jwt-authen.service';
import { AppEnvironment } from './app.environment';


@Module({
  imports: [
    MongooseModule.forRoot(AppEnvironment.dbHost),
    MongooseModule.forFeature([
      { name: 'Member', schema: memberSchema },
      { name: 'AccessToken', schema: accessTokenSchema }
    ])
  ],
  controllers: [
    AppController,
    AccountController,
    MemberController
  ],
  providers: [
    AppService,
    DBAuthenService,
    JwtAuthenService,
    DBAuthenStrategy,
    JwtAuthenStrategy,
    MemberService
  ],
})
export class AppModule { }
