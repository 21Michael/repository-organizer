import { Repository } from './../../../types/storeReduxToolkit/repositories/asyncActions';
import reducer from "../../../storeReduxToolkit/repositories/slices";
import { InitialState } from "../../../types/storeReduxToolkit/repositories/slices";

export default describe("Repositories slice:", () => {
  const initialState: InitialState = {
    repositories: [],
    repositoryEditSuccess: false,
    repositoryAddSuccess: false,
  };
  const mockRepository: Repository = {
    _id: "testId",
    prop: "testProp",
    name: '', description: '', stars: '', creatorName: '', createdAt: ''
  };
  afterAll(() => jest.clearAllMocks());

  test("addRepositorySuccess action", () => {
    initialState.repositoryAddSuccess = false;
    initialState.repositories = [];
    const mockPayload = {};
    const actualState = reducer(initialState, {
      payload: mockPayload,
      type: "repositories/addRepositorySuccess",
    });
    expect(actualState.repositories.length).toBe(1);
    expect(actualState.repositoryAddSuccess).toBe(
      !initialState.repositoryAddSuccess
    );
  });

  test("addRepositoryFailed action", () => {
    initialState.repositoryAddSuccess = true;
    const actualState = reducer(initialState, {
      type: "repositories/addRepositoryFailed",
    });
    expect(actualState.repositoryAddSuccess).toBe(
      !initialState.repositoryAddSuccess
    );
  });

  test("editRepositorySuccess action", () => {
    initialState.repositories = [mockRepository];
    initialState.repositoryEditSuccess = false;
    const mockPayload = {
      id: "testId",
      repository: { prop: "testPropEdited" },
    };
    const actualState = reducer(initialState, {
      payload: mockPayload,
      type: "repositories/editRepositorySuccess",
    });
    expect(actualState.repositories[0].prop).toBe(mockPayload.repository.prop);
    expect(actualState.repositoryEditSuccess).toBe(
      !initialState.repositoryEditSuccess
    );
  });

  test("editRepositoryFailed action", () => {
    initialState.repositoryEditSuccess = true;
    const actualState = reducer(initialState, {
      type: "repositories/editRepositoryFailed",
    });
    expect(actualState.repositoryEditSuccess).toBe(
      !initialState.repositoryEditSuccess
    );
  });

  test("deleteRepository action", () => {
    initialState.repositories = [mockRepository];
    const actualState = reducer(initialState, {
      payload: "testId",
      type: "repositories/deleteRepository/fulfilled",
    });
    expect(actualState.repositories.length).toBe(0);
  });

  test("fetchRepositories action", () => {
    initialState.repositories = [];
    const mockPayload = [{}];
    const actualState = reducer(initialState, {
      payload: mockPayload,
      type: "repositories/fetchRepositories/fulfilled",
    });
    expect(actualState.repositories.length).toBe(1);
  });
});
