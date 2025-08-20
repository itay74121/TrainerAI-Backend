import { createApp, createNewToken } from "../createApp";
import { jest } from "@jest/globals";

// Extend timeout for this test since it may call external services
jest.setTimeout(10000);
// Mock external OpenAI agents to avoid slow external calls in tests
jest.mock('@openai/agents', () => {
  return {
    Agent: {
      create: () => ({})
    },
    run: async () => ({ finalOutput: "mocked response" }),
  } as any;
});
import { Express } from "express";
import request from "supertest";
import { AgentRequest } from "../controller/Agent";

describe("Testing Agent Eduardo", () => {
  let app: Express;

  beforeAll(() => {
    app = createApp();
  });

  it("Eduardo should answer a simple question", async () => {
    const requestBody: AgentRequest = {
      messages: [{ role: "system", content: "Do as the instructions says" }],
      newMessage: {
        role: "user",
        content: "hello there",
      },
      time: new Date(),
      uid: {
        uid: "123456",
        email: "itay.yosef.dev@gmail.com",
        name: "itay yosef",
      },
    };
    const token:string =  createNewToken()
    const response = await request(app)
      .post("/Agent/Eduardo")
      .auth(token,{type:"bearer"})
      .send(requestBody);
    expect(response.status).toBe(201); // adjust to your API
    // optionally inspect body:
    // expect(response.body).toMatchObject({ ... })
  });
});
