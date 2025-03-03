import mongoose, { Schema } from "mongoose"

const RequestScheme = new Schema({
    Time:Number,
    Body:String,
    Header:String,
    Route:String,
    messages:[{
        role:String,
        content:String,
    }],
    model:String,
    Stream:Boolean,
    Token:String,
    Tokenlength:Number,
    userid:String
},{collection:"Request"})


export const RequestModel = mongoose.model("Request",RequestScheme)