import bcrypt from 'bcryptjs';
import { mockCreatedUser } from './../../__mocks__/routes';
import { mockNote, mockUser } from '../../__mocks__/routes';
import request from "supertest";
import app from "../../../server";
import db from "../../../services/index";

const Note = db.Note;
const User = db.User;

export default describe("DELETE - /notes/id - deleteNote", () => {
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
    spyOn(Note, 'deleteOne').and.returnValue(true);
    const response = await request(app)
      .delete(`/notes/testId`)
      .set("cookie", cookie);

    const { statusCode } = response;
    expect(Note.deleteOne).toHaveBeenCalled();
    expect(statusCode).toBe(204);
    done();
  });

  test("Invalid data", async (done) => {
    spyOn(Note, 'deleteOne').and.throwError('error');
    const response = await request(app)
      .delete(`/notes/testInvalidId`)
      .set("cookie", cookie);

    const { error, statusCode } = response;
    expect(Note.deleteOne).toHaveBeenCalled();
    expect(statusCode).toBe(404);
    expect(error).toBeTruthy();
    done();
  });
});
