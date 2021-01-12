const mockUserModel = {
    beforeCreate: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn()
}
const mockNoteModel = {
    findAll: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
}
const mockRepositoryModel = {
    findAll: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
}

export default {
    mockRepositoryModel,
    mockNoteModel,
    mockUserModel
}