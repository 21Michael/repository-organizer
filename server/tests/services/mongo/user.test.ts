import { mockUserLocal, mockUserGitHub } from './../../__mocks__/services';
import mockModels from '../../__mocks__/models/modelsMongo'
import User from '../../../services/mongo/user.service';

const mockUserModel = mockModels.mockUserModel;

export default describe("Service user tests:", () => {
    const userService = new User(mockUserModel);

    test("Create user localy:", async (done) => {
        await userService.createUser(mockUserLocal);
        expect(spyOn(mockUserModel.prototype, 'save')).toHaveBeenCalled;
        done();
    });

    test("Create user by github:", async (done) => {
        await userService.createUserGitHub(mockUserGitHub);
        expect(spyOn(mockUserModel.prototype, 'save')).toHaveBeenCalled;
        done();
    });
    test("Find one user:", async (done) => {
        await userService.findOne({ id: 'testId' });
        expect(mockUserModel.findOne).toHaveBeenCalled();
        done();
    });
    test("Find one user by email:", async (done) => {
        await userService.findOneByEmail({ email: 'testEmail' });
        expect(mockUserModel.findOne).toHaveBeenCalled();
        done();
    });
    test("Find one user by github_id:", async (done) => {
        await userService.findOneByGitHubId({ id: 'testId' });
        expect(mockUserModel.findOne).toHaveBeenCalled();
        done();
    });
    test("Remove one user:", async (done) => {
        await userService.deleteOne({ id: 'testId' });
        expect(mockUserModel.deleteOne).toHaveBeenCalled();
        done();
    });
});