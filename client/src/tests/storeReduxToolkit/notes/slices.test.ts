import { Note } from './../../../types/storeReduxToolkit/notes/slices';
import reducer from "../../../storeReduxToolkit/notes/slices";
import { InitialState } from "../../../types/storeReduxToolkit/notes/slices";

export default describe("Notes slice:", () => {
  const initialState: InitialState = {
    notes: [],
    noteAddSuccess: false,
    noteEditSuccess: false,
  };
  const mockNote: Note = {
    id: "testId",
    _id: "testId",
    text: "testText",
    repositoryId: '',
    createdAt: ''
  };
  afterAll(() => jest.clearAllMocks());

  test("addNoteSuccess action", () => {
    initialState.noteAddSuccess = false;
    initialState.notes = [];
    const mockPayload = {};
    const actualState = reducer(initialState, {
      payload: mockPayload,
      type: "notes/addNoteSuccess",
    });
    expect(actualState.notes.length).toBe(1);
    expect(actualState.noteAddSuccess).toBe(!initialState.noteAddSuccess);
  });

  test("addNoteFailed action", () => {
    initialState.noteAddSuccess = true;
    const actualState = reducer(initialState, {
      type: "notes/addNoteFailed",
    });
    expect(actualState.noteAddSuccess).toBe(!initialState.noteAddSuccess);
  });

  test("editNoteSuccess action", () => {
    initialState.notes = [mockNote];
    initialState.noteEditSuccess = false;

    const mockPayload = {
      id: "testId",
      text: "testTextEdited",
    };
    const actualState = reducer(initialState, {
      payload: mockPayload,
      type: "notes/editNoteSuccess",
    });
    expect(actualState.notes[0].text).toBe(mockPayload.text);
    expect(actualState.noteEditSuccess).toBe(!initialState.noteEditSuccess);
  });

  test("editNoteFailed action", () => {
    initialState.noteEditSuccess = true;
    const actualState = reducer(initialState, {
      type: "notes/editNoteFailed",
    });
    expect(actualState.noteEditSuccess).toBe(!initialState.noteEditSuccess);
  });

  test("deleteNote action", () => {
    initialState.notes = [mockNote];
    const actualState = reducer(initialState, {
      payload: "testId",
      type: "notes/deleteNote/fulfilled",
    });
    expect(actualState.notes.length).toBe(0);
  });

  test("fetchNotes action", () => {
    initialState.notes = [];
    const mockPayload = [{}];
    const actualState = reducer(initialState, {
      payload: mockPayload,
      type: "notes/fetchNotes/fulfilled",
    });
    expect(actualState.notes.length).toBe(1);
  });
});
