import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMemberDocument } from 'interfaces/member.interface';
import { IRegister, IAccount, RoleAccount } from 'interfaces/app.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Member') private MemberCollection: Model<IMemberDocument>
  ) { }

  //ลงทะเบียน
  async onRegister(body: IRegister) {
    delete body.cpassword;
    const model: IAccount = body;
    model.image = '';
    model.position = '';
    model.role = RoleAccount.Member;
    return await this.MemberCollection.create(model);
  }

}
