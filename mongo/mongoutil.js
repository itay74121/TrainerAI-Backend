import mongoose, { model } from "mongoose";
import dotenv from "dotenv";
import { RequestModel } from "./RequestModel.js";
import { MessageModel } from "./MessageScheme.js";
import { text } from "stream/consumers";

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

    await mongoose.connect(`mongodb://${username}:${password}@localhost:27017`, {
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
        const db = mongoose.connection.useDb("TrainerAI");
        const model = db.model(RequestModel.name,RequestModel.schema)
        let obj={
            Time: Date.now(),
            Route: req.url,
            Body:req.body
        }
        try{
            const body = JSON.parse(Buffer.from(req.body.token.split(".")[1],"base64").toString());
            const header = Buffer.from(req.body.token.split(".")[0],"base64").toString();
            obj = {
                Time: Date.now(),
                Route: req.url,
                model: body.model,
                Stream: body.stream,
                Token: req.body.token,
                Tokenlength: req.body.token.length,
                userid: body.userid,
                Header:header
            }
        } catch (error){
            console.log(error)
        }
        model.create(obj)
    }
    next();
}


export function LogMessages(req, res, next) {
    if (req.body.messages !== undefined) {
        const messages = req.body.messages;
        const uid = req.body.userid;
        const model = req.body.model;
        let MessageRecord = {
            Time: Date.now(),
            text: messages[messages.length - 1].content,
            role: "User",
            index: messages.length - 1,
            userid: uid,
            model: model
        };

        MessageModel.create(MessageRecord).catch(console.error);

        const originalSend = res.send.bind(res); // Ensure res.send keeps its context

        res.send = function (body) {
            try {
                const responsebody = JSON.parse(Buffer.from(body.token.split(".")[1], "base64").toString());
                let obj = {
                    Time: Date.now(),
                    text: responsebody.message.content,
                    role: "AI",
                    index: messages.length,
                    userid: uid,
                    model: model
                };

                MessageModel.create(obj).catch(console.error);
            } catch (error) {
                console.error("Error parsing response body:", error);
            }
            res.send = originalSend; // Restore original res.send
            return originalSend(body); // Call the original res.send with preserved context
        };
    }

    next();
}
