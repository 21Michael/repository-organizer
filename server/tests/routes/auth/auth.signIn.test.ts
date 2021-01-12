import bcrypt from 'bcryptjs';
import { mockUserSignIn, mockCreatedUser } from './../../__mocks__/routes';
import request from "supertest";
import app from "../../../server";
import db from "../../../services/index";

const User = db.User;

export default describe("POST - auth/sign-in", () => {

  test("valid data", async (done) => {
    spyOn(User, 'findOneByEmail').and.returnValue(mockCreatedUser);
    spyOn(bcrypt, 'compare').and.returnValue(true);
    const response = await request(app).post("/auth/sign-in").send(mockUserSignIn);
    const { statusCode, text } = response;
    expect(User.findOneByEmail).toHaveBeenCalled();
    expect(statusCode).toBe(200);
    expect(text).toBe("User signed in!");
    done();
  });

  test("Invalid data", async (done) => {
    spyOn(User, 'findOneByEmail').and.throwError('error');
    const response = await request(app).post("/auth/sign-in").send(mockUserSignIn);

    const { statusCode, text, error } = response;
    expect(error).toBeTruthy()
    expect(statusCode).toBe(401);
    done();
  });
});
