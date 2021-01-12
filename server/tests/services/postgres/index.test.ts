import NoteTests from './note.test'
import RepositoryTests from './repository.test'
import UserTests from './user.test'

export default describe("POSTGRES SERVICES: ", () => {
    UserTests
    NoteTests
    RepositoryTests
});

