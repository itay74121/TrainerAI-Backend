import { Agent } from "@openai/agents";
import { readFileSync, existsSync } from "fs";
import * as path from "node:path";
import * as config from "../../config.json";

// dynamic class instruction loading.
function get_instructions(): string {
    const p = path.join("./", "agents", "eduardo", "instructions.txt");
    let botinstructions: string = "";
    if (existsSync && existsSync(p)) {
        botinstructions = readFileSync(p).toString();
    }
    return botinstructions;
}

const AgentEduardo = Agent.create({
    name: "Agent Eduardo",
    instructions: get_instructions(),
    model: config.baseModel,
    modelSettings:{
        ...config.baseModelSettings   
    },
});

export default AgentEduardo;
