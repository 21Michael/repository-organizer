import request from "supertest";
import app from "../../../server";
import db from "../../../services/index";

const User = db.User;

export default describe("GET - auth/sign-out", () => {

  test("valid data", async (done) => {
    const response = await request(app).get("/auth/sign-out");

    const { statusCode, text } = response;
    expect(statusCode).toBe(200);
    expect(text).toBe("Current user was logged out");
    done();
  });
});
