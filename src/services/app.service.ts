import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Cat') private catTable: Model<any>
  ) {
    // console.log(catTable);
  }

  async getItem() {
    return await this.catTable.find();
  }

  createItem() {
    const model = new this.catTable({
      name: Date().toString(),
      age: Math.random()
    });
    model.save();
  }

  root(): string {
    return 'Hello World! ';
  }
}
