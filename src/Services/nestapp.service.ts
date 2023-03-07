import { Injectable,Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNestAppDto } from '../DTO/nestApp.dto';
import { INestApp } from '../Interface/nestApp.interface';
import { Model } from 'mongoose';
import { UpdateNestDto } from 'src/DTO/updateNest.dto';

@Injectable({scope: Scope.REQUEST,durable: true})
export class NestAppService {
    constructor(@InjectModel('NestApp') private nestAppModel: Model<INestApp>) { }

    async createNestApp(createNestAppDto: CreateNestAppDto): Promise<object> {
        const item = await this.nestAppModel.find({'id':createNestAppDto.id});
        if (item.length != 0) {
            let object = {
                'message':'user already exists'
            };
            return object
        } else {
            const newNestApp = new this.nestAppModel(createNestAppDto);
            return newNestApp.save();
        }
    }

    async getNestApp(): Promise<INestApp[]> {
        const findNest = await this.nestAppModel.find({}, { _id: 0, __v: 0 });
        return findNest;
    }

    async updateNestApp(id: string,updateNestDto:UpdateNestDto): Promise<string> {
        await this.nestAppModel.updateOne({'id':id},{$set:{...updateNestDto}})
        return 'success';
    } 
}