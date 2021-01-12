import bcrypt from 'bcryptjs';
import { mockUser, mockNotes, mockCreatedUser } from './../../__mocks__/routes';
import request from "supertest";
import app from "../../../server";
import db from "../../../services/index";

const Note = db.Note;
const User = db.User;

export default describe("GET - /notes", () => {
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
    spyOn(Note, 'findAll').and.returnValue(mockNotes);
    const response = await request(app).get("/notes").set("cookie", cookie);

    const { statusCode, body } = response;
    expect(Note.findAll).toHaveBeenCalled();
    expect(statusCode).toBe(200);
    expect(body).toEqual(mockNotes);
    done();
  });

  test("Invalid data", async (done) => {
    spyOn(Note, 'findAll').and.throwError('error');
    const response = await request(app).get("/notes").set("cookie", cookie);

    const { statusCode, error } = response;
    expect(Note.findAll).toHaveBeenCalled();
    expect(statusCode).toBe(404);
    expect(error).toBeTruthy();
    done();
  });

});
