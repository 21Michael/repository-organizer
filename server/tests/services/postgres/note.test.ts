import { mockNote } from './../../__mocks__/services';
import mockModels from '../../__mocks__/models/modelsPostgres'
import Note from '../../../services/postgres/note.service';

const mockNoteModel = mockModels.mockNoteModel;

export default describe("Service note tests:", () => {
  const noteService = new Note(mockNoteModel);

  test("Find all:", async (done) => {
    await noteService.findAll({ id: 'testId' });
    expect(mockNoteModel.findAll).toHaveBeenCalled();
    done();
  });

  test("Create note:", async (done) => {
    await noteService.createNote(mockNote);
    expect(mockNoteModel.create).toHaveBeenCalled();
    done();
  });

  test("Update note:", async (done) => {
    await noteService.updateOne({ text: 'testText', userId: 'testUserId', noteId: 'testNoteId' });
    expect(mockNoteModel.update).toHaveBeenCalled();
    done();
  });

  test("Delete note:", async (done) => {
    await noteService.deleteOne({ userId: 'testUserId', noteId: 'testNoteId' });
    expect(mockNoteModel.destroy).toHaveBeenCalled();
    done();
  });
});
