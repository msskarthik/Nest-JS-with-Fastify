import { Document } from "mongoose";

export interface INestApp extends Document {
    readonly name: String;
    readonly id: Number;
    readonly Exist: Boolean;
}