import { mockNote } from '../../__mocks__/services';
import mockModels from '../../__mocks__/models/modelsMongo'
import Note from '../../../services/mongo/note.service';

const mockNoteModel = mockModels.mockNoteModel;

export default describe("Service note tests:", () => {
  const noteService = new Note(mockNoteModel);

  test("Find all:", async (done) => {
    await noteService.findAll({ id: 'testId' });
    expect(mockNoteModel.find).toHaveBeenCalled();
    done();
  });

  test("Create note:", async (done) => {
    await noteService.createNote(mockNote);
    expect(spyOn(mockNoteModel.prototype, 'save')).toHaveBeenCalled;
    done();
  });

  test("Update note:", async (done) => {
    await noteService.updateOne({ text: 'testText', user_id: 'testUserId', note_id: 'testNoteId' });
    expect(mockNoteModel.findOne).toHaveBeenCalled();
    expect(spyOn(mockNoteModel.prototype, 'save')).toHaveBeenCalled;
    done();
  });

  test("Delete note:", async (done) => {
    await noteService.deleteOne({ user_id: 'testUserId', note_id: 'testNoteId' });
    expect(mockNoteModel.deleteOne).toHaveBeenCalled();
    done();
  });
});
