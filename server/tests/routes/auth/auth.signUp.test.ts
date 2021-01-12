import { mockCreatedUser, mockUser } from './../../__mocks__/routes';
import request from "supertest";
import app from "../../../server";
import db from "../../../services/index";

const User = db.User;

export default describe("POST - auth/sign-up", () => {
  test("Valid data", async (done) => {
    spyOn(User, 'createUser').and.returnValue(mockCreatedUser);
    const response = await request(app).post("/auth/sign-up").send(mockUser);

    const { statusCode, text, headers } = response;
    expect(User.createUser).toHaveBeenCalled();
    expect(statusCode).toBe(201);
    expect(headers.location).toBeTruthy()
    expect(text).toBe("User signed up!");
    done();
  });

  test("Invalid data", async (done) => {
    spyOn(User, 'createUser').and.throwError('error');
    const response = await request(app).post("/auth/sign-up").send(mockUser);

    const { statusCode, error } = response;
    expect(User.createUser).toHaveBeenCalled();
    expect(statusCode).toBe(400);
    expect(error).toBeTruthy();
    done();
  });

});
