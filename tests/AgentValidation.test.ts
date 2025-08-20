import { createApp, createNewToken } from "../createApp";
import { Express } from "express";
import request from "supertest";
import { AgentRequest } from "../controller/Agent";

describe("Agent endpoint validation tests", () => {
  let app: Express;
  let validToken: string;

  beforeAll(() => {
    app = createApp();
    validToken = createNewToken();
  });

  it("should reject payload missing required fields with 400", async () => {
    const invalidPayload: any = {
      // missing messages structure and time/uid
    };

    const res = await request(app)
      .post("/Agent/Eduardo")
      .auth(validToken, { type: "bearer" })
      .send(invalidPayload);

    expect(res.status).toBe(400);
    expect(res.body?.status).toBe("invalid_request");
  });

  it("should reject malformed messages structure with 400", async () => {
    const invalidPayload: any = {
      messages: [
        { role: "system" } // missing content
      ],
      newMessage: { role: "user", content: "hi" },
      time: new Date().toISOString(),
      uid: { uid: "123" },
    };

    const res = await request(app)
      .post("/Agent/Eduardo")
      .auth(validToken, { type: "bearer" })
      .send(invalidPayload);

    expect(res.status).toBe(400);
    expect(res.body?.status).toBe("invalid_request");
  });

  it("should return 401 when Authorization header is missing", async () => {
    const validPayload: AgentRequest = {
      messages: [{ role: "system", content: "Do as instructed" }],
      newMessage: { role: "user", content: "hello" },
      time: new Date(),
      uid: {
        uid: "123456",
        email: "test@example.com",
        name: "Test User",
      },
    };

    const res = await request(app)
      .post("/Agent/Eduardo")
      // No auth header
      .send(validPayload);

    expect(res.status).toBe(401);
  });
});


