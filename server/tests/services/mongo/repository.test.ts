import { mockRepo } from './../../__mocks__/services';
import mockModels from '../../__mocks__/models/modelsMongo'
import Repository from '../../../services/mongo/repository.service';

const mockRepositoryModel = mockModels.mockRepositoryModel;

export default describe("Service repository tests:", () => {
    const repositoryService = new Repository(mockRepositoryModel);

    test("Find all:", async (done) => {
        await repositoryService.findAll();
        expect(mockRepositoryModel.find).toHaveBeenCalled();
        done();
    });

    test("Create repo:", async (done) => {
        await repositoryService.createRepository(mockRepo);
        expect(spyOn(mockRepositoryModel.prototype, 'save')).toHaveBeenCalled;
        done();
    });

    test("Update repo:", async (done) => {
        await repositoryService.updateOne({ id: 'testId', ...mockRepo });
        expect(mockRepositoryModel.findOne).toHaveBeenCalled();
        expect(spyOn(mockRepositoryModel.prototype, 'save')).toHaveBeenCalled;
        done();
    });

    test("Delete repo:", async (done) => {
        await repositoryService.deleteOne({ id: 'testId' });
        expect(mockRepositoryModel.deleteOne).toHaveBeenCalled();
        done();
    });
});