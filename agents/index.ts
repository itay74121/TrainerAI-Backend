import type { Agent } from "@openai/agents";
import AgentEduardo from "./eduardo/eduardo";

const agents: Record<string, Agent> = {
    Eduardo: AgentEduardo,
};

export function findAgent(name: string): Agent | null {
    for (const key of Object.keys(agents)) {
        if (key.toLowerCase().includes(name.toLowerCase())) {
            return agents[key];
        }
    }
    return null;
}

export { agents }; // optional
