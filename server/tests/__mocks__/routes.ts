export const mockUser = {
    name: 'Alex',
    signedBy: 'local',
    email: 'gmail@gmail.com',
    password: 'AA11!aaa'
};

export const mockUserSignIn = {
    email: "gmail@gmail.com", password: "AA11!aaa"
}

export const mockCreatedUser = {
    id: 'testId',
    ...mockUser
};

export const mockNote = {
    repositoryId: "254138476",
    text: "test note",
    createdAt: "2020-10-01 00:00:00+00",
};

export const mockCreatedNote = {
    id: 'testId',
    ...mockNote
};

export const mockNotes = [mockNote];

export const mockRepository = {
    name: "Repository 1",
    description: "description",
    stars: 100,
    creatorName: "Alex",
    createdAt: "2020-10-01 00:00:00+00",
};

export const mockCreatedRepository = {
    id: 'testId',
    ...mockRepository
};

export const mockRepositories = [mockRepository]