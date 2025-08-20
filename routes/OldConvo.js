import dotenv from "dotenv";
dotenv.config();
import express from "express";
const router = express.Router();
import cors from "cors";
import { getJWT } from "../util/Authentication.js";
import { MessageModel } from "../mongo/MessageScheme.js";

router.use(cors()); // Add this line to use the cors middleware

router.post("/", async (req, res) => {
    const index = req.body.index;
    const amount = req.body.amount;
    const userid = req.body.userid;
    const model = req.body.model;
    MessageModel.find({
        userid: userid,
        model: model,
        index: { $lt: index },
        Time: {},
    })
        .sort({ Time: -1 })
        .limit(amount)
        .exec((err, docs) => {
            if (err) {
                console.log(err);
                res.send({ error: err });
            } else {
                res.send(docs);
            }
        });
});

export default router;
