import mongoose, { model, Schema } from "mongoose"

const MessageScheme = new Schema({
    Time:Number,
    text:String,
    role:String,
    index:Number,
    userid:String,
    model:String

},{collection:"Message"})

const db = mongoose.connection.useDb("TrainerAI");
const scheme = mongoose.model("Message",MessageScheme)
export const MessageModel = db.model(scheme.name,scheme.schema) 