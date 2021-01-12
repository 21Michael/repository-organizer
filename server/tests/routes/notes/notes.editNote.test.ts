import bcrypt from 'bcryptjs';
import { mockNote, mockUser, mockCreatedNote, mockCreatedUser } from './../../__mocks__/routes';
import request from "supertest";
import app from "../../../server";
import db from "../../../services/index";

const Note = db.Note;
const User = db.User;

export default describe("PUT - /notes/id - editNote", () => {
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
    spyOn(Note, 'updateOne').and.returnValue(mockCreatedNote);
    const response = await request(app)
      .put(`/notes/testId`)
      .set("cookie", cookie)
      .send({ text: "new note text" });

    const { statusCode } = response;
    expect(Note.updateOne).toHaveBeenCalled();
    expect(statusCode).toBe(204);
    done();
  });

  test("Invalid data", async (done) => {
    spyOn(Note, 'updateOne').and.throwError('error');
    const response = await request(app)
      .put(`/notes/testId`)
      .set("cookie", cookie)
      .send({ text: "invalidText" });

    const { statusCode, error } = response;
    expect(statusCode).toBe(404);
    expect(Note.updateOne).toHaveBeenCalled();
    expect(error).toBeTruthy();
    done();
  });
});
