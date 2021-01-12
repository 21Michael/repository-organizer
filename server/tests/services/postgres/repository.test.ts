import { mockRepo } from './../../__mocks__/services';
import mockModels from '../../__mocks__/models/modelsPostgres'
import Repository from '../../../services/postgres/repository.service';

const mockRepositoryModel = mockModels.mockRepositoryModel;

export default describe("Service repository tests:", () => {
    const repositoryService = new Repository(mockRepositoryModel);

    test("Find all:", async (done) => {
        await repositoryService.findAll();
        expect(mockRepositoryModel.findAll).toHaveBeenCalled();
        done();
    });

    test("Create repo:", async (done) => {
        await repositoryService.createRepository(mockRepo);
        expect(mockRepositoryModel.create).toHaveBeenCalled();
        done();
    });

    test("Update repo:", async (done) => {
        await repositoryService.updateOne({ id: 'testId', ...mockRepo });
        expect(mockRepositoryModel.update).toHaveBeenCalled();
        done();
    });

    test("Delete repo:", async (done) => {
        await repositoryService.deleteOne({ id: 'testId' });
        expect(mockRepositoryModel.destroy).toHaveBeenCalled();
        done();
    });
});