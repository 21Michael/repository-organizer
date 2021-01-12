import bcrypt from 'bcryptjs';
import { mockUser, mockCreatedUser } from './../../__mocks__/routes';
import request from "supertest";
import app from "../../../server";
import db from "../../../services/index";

const User = db.User;

export default describe("GET - /auth/current-user", () => {
  let cookie;

  beforeAll(async () => {
    spyOn(User, 'findOneByEmail').and.returnValue(mockCreatedUser);
    spyOn(bcrypt, 'compare').and.returnValue(true);
    const response = await request(app).post("/auth/sign-in").send(mockUser);
    cookie = response.headers["set-cookie"];
  });

  beforeEach(() => {
    spyOn(User, 'findOne').and.returnValue(mockCreatedUser);
  })

  test("User logged in", async (done) => {
    const response = await request(app)
      .get("/auth/current-user")
      .set("cookie", cookie);

    const { statusCode, body } = response;
    expect(statusCode).toBe(200);
    done();
  });

  test("No one logged in", async (done) => {
    const response = await request(app).get("/auth/current-user");
    const { statusCode, text } = response;
    expect(statusCode).toBe(401);
    expect(text).toBe("No one user currently logged in");
    done();
  });
});
