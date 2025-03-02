import mongoose from "mongoose";
import dotenv from "dotenv";
import { RequestModel } from "./RequestModel.js";

const $get=(value)=>{
    if (value === undefined) return ""
    if (value === null) return ""
    return value
}

let connection = null;

async function ConnectToMyDB() {
    dotenv.config()
    
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;

    await mongoose.connect(`mongodb://${username}:${password}@localhost:27017/TrainerAI`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {  
        console.log("Connected to MongoDB");
    }).catch((err) => { 
        console.log("Error connecting to MongoDB", err);
    });
}

export function CheckConnection (req,res,next){
    if ([mongoose.ConnectionStates.disconnected,
        mongoose.ConnectionStates.disconnecting,
        mongoose.ConnectionStates.uninitialized].includes( mongoose.connection.readyState )){
            ConnectToMyDB();
    }
    next();
}

export function LogRequest(req,res,next){
    if (req.body.token !== undefined){
        let obj={}
        try{
            const body = JSON.parse(Buffer.from(req.body.token.split(".")[1],"base64").toString());
            const header = Buffer.from(req.body.token.split(".")[0],"base64").toString();
            obj={
                Time: Date.now(),
                Route: req.url,
                model: body.model,
                Stream: body.stream,
                Token: req.body.token,
                Header:header
            }
        } catch (error){
            obj={
                Time: Date.now(),
                Route: $get(req.url),
                body:$get(req.body)
            }
        }
        RequestModel.create(obj)
    }
    else{
        RequestModel.create({
            Time: Date.now(),
            Route: req.url,
            Body:req.body
        })
    }
    
    next();
}