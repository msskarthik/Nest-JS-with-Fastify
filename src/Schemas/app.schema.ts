import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NestDocument = HydratedDocument<NestApp>;

@Schema()
export class NestApp {
    @Prop({ required: true })
    name: String;

    @Prop()
    id: Number;

    @Prop()
    Exist: Boolean;
}

export const NestAppSchema = SchemaFactory.createForClass(NestApp);
