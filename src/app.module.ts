import { Module, Logger } from '@nestjs/common';
import { AppController } from './Controllers/app.controller';
import { AppService } from './Services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './Config/configuration.config';
import { NestAppController } from './Controllers/nestapp.controller';
import { NestAppSchema } from './Schemas/app.schema';
import { NestAppService } from './Services/nestapp.service';


@Module({
    imports: [ConfigModule.forRoot({
        load: [configuration],
        isGlobal: true
    }), MongooseModule.forRootAsync({
        useFactory: (configService: ConfigService) => {
            const uri = configService.get('Mongoose');
            Logger.log('MongoDB Connected')
            return { uri };
        },
        inject: [ConfigService],
    }), MongooseModule.forFeature([{ name: 'NestApp', schema: NestAppSchema }])],
    controllers: [AppController, NestAppController],
    providers: [AppService, NestAppService],
})

export class AppModule { }