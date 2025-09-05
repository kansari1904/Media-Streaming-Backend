import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import app from "../server.js";
import mediaAssetModel from "../models/mediaAssetModel.js";

jest.setTimeout(30000);

let mediaId;
let testToken;

beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL);

    const media = await mediaAssetModel.create({
        title: "Test Video",
        type: "video",
        file_url: "http://example.com/video.mp4",
    });
    mediaId = media._id.toString();

    
    testToken = jwt.sign(
        { id: new mongoose.Types.ObjectId().toString() },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
    );
});

afterAll(async () => {
    await mediaAssetModel.deleteMany({});
    await mongoose.connection.close();
});

describe("POST /media/:id/view", () => {
    it("should log a view successfully", async () => {
        const res = await request(app)
            .post(`/media/${mediaId}/view`)
            .set("Cookie", [`token=${testToken}`])
            .send({});

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message", "View logged successfully");
    });

    it("should enforce rate limiting", async () => {
        for (let i = 0; i < 5; i++) {
            await request(app)
                .post(`/media/${mediaId}/view`)
                .set("Cookie", [`token=${testToken}`])
                .send({});
        }

        const res = await request(app)
            .post(`/media/${mediaId}/view`)
            .set("Cookie", [`token=${testToken}`])
            .send({});

        expect(res.statusCode).toBe(429);
        expect(res.body).toHaveProperty("message", "Too many requests, please try again later.");
    });
});
