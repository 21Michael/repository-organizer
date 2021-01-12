import bcrypt from 'bcryptjs';
import { mockRepository, mockUser, mockCreatedUser } from './../../__mocks__/routes';
import request from "supertest";
import app from "../../../server";
import db from "../../../services/index";

const Repository = db.Repository;
const User = db.User;

export default describe("PUT - /repositories/id - editRepository", () => {
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
    spyOn(Repository, 'updateOne').and.returnValue(mockRepository);
    mockRepository.description = "new description";
    const response = await request(app)
      .put(`/repositories/testId`)
      .set("cookie", cookie)
      .send({ description: "new description", ...mockRepository });

    const { statusCode } = response;
    expect(Repository.updateOne).toHaveBeenCalled();
    expect(statusCode).toBe(204);
    done();
  });

  test("Invalid data", async (done) => {
    spyOn(Repository, 'updateOne').and.throwError('error');
    const response = await request(app)
      .put(`/repositories/testId`)
      .set("cookie", cookie)
      .send();

    const { statusCode } = response;
    expect(Repository.updateOne).toHaveBeenCalled();
    expect(statusCode).toBe(404);
    done();
  });
});
