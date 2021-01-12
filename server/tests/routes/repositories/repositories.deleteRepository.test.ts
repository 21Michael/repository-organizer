import bcrypt from 'bcryptjs';
import { mockRepository, mockUser, mockCreatedUser } from './../../__mocks__/routes';
import request from "supertest";
import app from "../../../server";
import db from "../../../services/index";

const Repository = db.Repository;
const User = db.User;

export default describe("DELETE - /repositories/id - deleteRepository", () => {
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

  test("Valid data", async (done) => {
    spyOn(Repository, 'deleteOne').and.returnValue(true);
    const response = await request(app)
      .delete(`/repositories/testId`)
      .set("cookie", cookie);

    const { statusCode } = response;
    expect(Repository.deleteOne).toHaveBeenCalled();
    expect(statusCode).toBe(204);
    done();
  });

  test("Invalid data", async (done) => {
    spyOn(Repository, 'deleteOne').and.throwError('error');
    const response = await request(app)
      .delete(`/repositories/testInvalidId`)
      .set("cookie", cookie);

    const { error, statusCode } = response;
    expect(Repository.deleteOne).toHaveBeenCalled();
    expect(statusCode).toBe(404);
    expect(error).toBeTruthy();
    done();
  });
});
