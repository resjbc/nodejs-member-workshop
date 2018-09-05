import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Member') private memberTable: Model<any>
  ) {
    // console.log(catTable);
  }

  async getItem() {
    return await this.memberTable.find();
  }

  createItem() {
    const model = new this.memberTable({
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'email',
      password: 'password',
      id: 1,
      position: 'position',
      image: 'image',
      role: 1,
    });
    model.save();
  }

  root(): string {
    return 'Hello World! ';
  }
}
