const mockUserModel = function () { };
mockUserModel.deleteOne = jest.fn()
mockUserModel.findOne = jest.fn()
mockUserModel.prototype.save = jest.fn()

const mockNoteModel = function () { };
mockNoteModel.find = jest.fn()
mockNoteModel.prototype.save = jest.fn()
mockNoteModel.deleteOne = jest.fn()
mockNoteModel.findOne = jest.fn()

const mockRepositoryModel = function () { }
mockRepositoryModel.find = jest.fn()
mockRepositoryModel.prototype.save = jest.fn()
mockRepositoryModel.deleteOne = jest.fn()
mockRepositoryModel.findOne = jest.fn()

export default {
    mockRepositoryModel,
    mockNoteModel,
    mockUserModel
}