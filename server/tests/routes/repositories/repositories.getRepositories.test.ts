import bcrypt from 'bcryptjs';
import { mockUser, mockRepositories, mockCreatedUser } from './../../__mocks__/routes';
import request from "supertest";
import app from "../../../server";
import db from "../../../services/index";

const Repository = db.Repository;
const User = db.User;

export default describe("GET - /repositories", () => {
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

  test("valid data", async (done) => {
    spyOn(Repository, 'findAll').and.returnValue(mockRepositories);
    const response = await request(app)
      .get("/repositories")
      .set("cookie", cookie);

    const { statusCode, body } = response;
    expect(statusCode).toBe(200);
    expect(Repository.findAll).toHaveBeenCalled();
    expect(body).toEqual(mockRepositories);
    done();
  });

  test("Invalid data", async (done) => {
    spyOn(Repository, 'findAll').and.throwError('error');
    const response = await request(app).get("/repositories").set("cookie", cookie);

    const { statusCode, error } = response;
    expect(statusCode).toBe(404);
    expect(error).toBeTruthy();
    expect(Repository.findAll).toHaveBeenCalled();
    done();
  });
});
