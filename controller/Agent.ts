import express, { Request, Response, NextFunction } from "express";
import { findAgent } from "../agents";
import { TypedRequestParamsAndBody } from "../types/express";
import {
    UserMessageItem,
    SystemMessageItem,
    AssistantMessageItem,
    Agent,
    run,
} from "@openai/agents";
import type { ParamsDictionary } from "express-serve-static-core";

export interface AgentParam extends ParamsDictionary {
    agent: string;
}

export interface AgentRequest {
    messages: UserMessageItem[] | SystemMessageItem[] | AssistantMessageItem[];
    newMessage: UserMessageItem;
    time: Date;
    uid: User;
}

export const Answer = async (
    req: TypedRequestParamsAndBody<AgentParam, AgentRequest>,
    res: Response<AssistantMessageItem>
) => {
    try {
        const agent: Agent | null = findAgent(req.params.agent);
        if (agent) {
            if (typeof req.body["newMessage"]["content"] === "string") {
                const response = await run(
                    agent,
                    req.body["newMessage"]["content"]
                );

                res.status(201).json({
                    role: "assistant",
                    status: "completed",
                    content: [
                        {
                            type: "output_text",
                            text: response.finalOutput
                                ? response.finalOutput
                                : "Error",
                        },
                    ],
                });
            } else {
                throw "no such agent";
            }
        }
    } catch (message) {
        console.log(message);
        res.status(500).json({
            status: "incomplete",
            content: [
                {
                    type: "refusal",
                    refusal: JSON.stringify(message),
                },
            ],
            role: "assistant",
        });
    }
};
