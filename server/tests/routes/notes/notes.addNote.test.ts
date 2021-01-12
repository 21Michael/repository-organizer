import { mockUser, mockNote, mockCreatedNote, mockCreatedUser } from './../../__mocks__/routes';
import request from "supertest";
import app from "../../../server";
import db from "../../../services/index";
import bcrypt from "bcryptjs";

const Note = db.Note;
const User = db.User;

export default describe("POST - /notes - addNote", () => {
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
    spyOn(Note, 'createNote').and.returnValue(mockCreatedNote);
    const response = await request(app)
      .post("/notes")
      .set("cookie", cookie)
      .send(mockNote);

    const { statusCode, headers, text } = response;
    expect(Note.createNote).toHaveBeenCalled();
    expect(response.headers.location.match(/(?<=\/\w+\/).+/g)[0]).toBeTruthy();
    expect(statusCode).toBe(201);
    expect(headers.location).toContain("/notes/");
    expect(text).toBe("Note added!");
    done();
  });

  test("Invalid data", async (done) => {
    spyOn(Note, 'createNote').and.throwError('error');
    const response = await request(app)
      .post("/notes")
      .set("cookie", cookie)
      .send(mockNote);

    const { statusCode, error } = response;
    expect(Note.createNote).toHaveBeenCalled();
    expect(statusCode).toBe(400);
    expect(error).toBeTruthy();
    done();
  });
});
