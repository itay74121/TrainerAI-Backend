import { createApp, createNewToken } from "../createApp";
import { jest } from "@jest/globals";
import { Logger } from "../util/Logging";
import { Express } from "express";
import request from "supertest";

// Extend timeout for this test since it may call external services
jest.setTimeout(10000);

describe("Testing the authentication route making sure it creates a jwt", () => {
    let app: Express;

    beforeAll(() => {
        app = createApp();
    });
    
    it("Dont Get back a jwt", async () => {
        request(app)
        .get("/api/v1/auth")
        
    });

    it("Get back a jwt", async () => {

    });
});
