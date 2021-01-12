import bcrypt from 'bcryptjs';
import { mockUser, mockRepository, mockCreatedRepository, mockCreatedUser } from './../../__mocks__/routes';
import request from "supertest";
import app from "../../../server";
import db from "../../../services/index";

const Repository = db.Repository;
const User = db.User;

export default describe("POST - /repositories - addRepository", () => {
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
    spyOn(Repository, 'createRepository').and.returnValue(mockCreatedRepository);
    const response = await request(app)
      .post("/repositories")
      .set("cookie", cookie)
      .send(mockRepository);

    const { statusCode, headers, text } = response;
    expect(Repository.createRepository).toHaveBeenCalled();
    expect(response.headers.location.match(/(?<=\/\w+\/).+/g)[0]).toBeTruthy();
    expect(statusCode).toBe(201);
    expect(headers.location).toContain("/repositories/");
    expect(text).toBe("Repository added!");
    done();
  });

  test("Invalid data", async (done) => {
    spyOn(Repository, 'createRepository').and.throwError('error');
    const response = await request(app)
      .post("/repositories")
      .set("cookie", cookie)
      .send(mockRepository);

    const { statusCode, error } = response;
    expect(statusCode).toBe(400);
    expect(error).toBeTruthy();
    done();
  });
});
