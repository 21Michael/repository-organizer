import request from "supertest";
import app from "../../../server";

export default describe("GET - /auth/github", () => {
  test("valid data", async (done) => {
    const response = await request(app).get("/auth/github");

    const { statusCode, redirect } = response;
    expect(statusCode).toBe(302);
    expect(redirect).toBeTruthy();
    done();
  });
});

describe("GET - auth/github/callback", () => {
  test("valid data", async (done) => {
    const response = await request(app).get("/auth/github/callback");

    const { statusCode, redirect } = response;
    expect(statusCode).toBe(302);
    expect(redirect).toBeTruthy();
    done();
  });
});
