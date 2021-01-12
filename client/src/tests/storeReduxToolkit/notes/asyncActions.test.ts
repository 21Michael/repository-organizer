import { EditNoteProps } from './../../../types/storeReduxToolkit/notes/asyncActions';
import { Note } from './../../../types/storeReduxToolkit/notes/slices';
import { AppDispatch } from './../../../types/storeReduxToolkit/configStore';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import { actions } from "../../../storeReduxToolkit/notes/slices";

jest.mock("axios");

const mockStore = configureMockStore([thunk]);
const store = mockStore();
const mockDispatch: AppDispatch = store.dispatch;
const mockAxios = axios as jest.Mocked<typeof axios>;

export default describe("Notes actions", () => {
  const mockNote: Note = {
    _id: '',
    id: '',
    repositoryId: "testId",
    text: "testText",
    createdAt: "2020/01/01",
    userId: "testId",
  };
  const mockEditNote: EditNoteProps = {
    id: "testId",
    text: "testText",
  };
  beforeEach(() => {
    store.clearActions();
  });
  afterAll(() => jest.clearAllMocks());

  test("AddNote success", async () => {
    const mockNewNoteId = "testNewNoteId";
    mockNote._id = mockNewNoteId
    const expectedActions = [
      { type: "notes/addNote/pending" },
      {
        payload: { ...mockNote },
        type: "notes/addNoteSuccess",
      },
      { type: "notes/addNote/fulfilled" },
    ];
    mockAxios.post.mockImplementation(() =>
      Promise.resolve({
        status: 201,
        headers: { location: `/notes/${mockNewNoteId}` },
      })
    );
    await mockDispatch(actions.addNote(mockNote));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("AddNote failed", async () => {
    const expectedActions = [
      { type: "notes/addNote/pending" },
      { type: "notes/addNote/rejected" },
    ];
    mockAxios.post.mockImplementation(() => Promise.reject());
    await mockDispatch(actions.addNote(mockNote));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("DeleteNote success", async () => {
    const expectedActions = [
      { type: "notes/deleteNote/pending" },
      { type: "notes/deleteNote/fulfilled" },
    ];
    mockAxios.delete.mockImplementation(() => Promise.resolve({ status: 204 }));
    await mockDispatch(actions.deleteNote(''));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("DeleteNote failed", async () => {
    const expectedActions = [
      { type: "notes/deleteNote/pending" },
      { type: "notes/deleteNote/rejected" },
    ];
    mockAxios.delete.mockImplementation(() => Promise.reject());
    await mockDispatch(actions.deleteNote(''));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("EditNote success", async () => {
    const expectedActions = [
      { type: "notes/editNote/pending" },
      { type: "notes/editNoteSuccess" },
      { type: "notes/editNote/fulfilled" },
    ];
    mockAxios.put.mockImplementation(() => Promise.resolve({ status: 204 }));
    await mockDispatch(actions.editNote(mockEditNote));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("EditNote failed", async () => {
    const expectedActions = [
      { type: "notes/editNote/pending" },
      { type: "notes/editNote/rejected" },
    ];
    mockAxios.put.mockImplementation(() => Promise.reject());
    await mockDispatch(actions.editNote(mockEditNote));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("FetchNotes success", async () => {
    const expectedActions = [
      { type: "notes/fetchNotes/pending" },
      { type: "notes/fetchNotes/fulfilled" },
    ];
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: [] })
    );
    await mockDispatch(actions.fetchNotes());
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("FetchNotes failed", async () => {
    const expectedActions = [
      { type: "notes/fetchNotes/pending" },
      { type: "notes/fetchNotes/rejected" },
    ];
    mockAxios.get.mockImplementation(() => Promise.reject());
    await mockDispatch(actions.fetchNotes());
    await expect(store.getActions()).toMatchObject(expectedActions);
  });
});
