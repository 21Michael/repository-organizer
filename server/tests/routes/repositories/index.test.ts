import addRepositoryTest from './repositories.addRepository.test'
import deleteRepositoryTest from './repositories.deleteRepository.test'
import editRepositoryTest from './repositories.editRepository.test'
import getRepositoriesTest from './repositories.getRepositories.test'


export default describe("ROUTERS REPOSITORIES: ", () => {
    addRepositoryTest
    deleteRepositoryTest
    editRepositoryTest
    getRepositoriesTest
});

