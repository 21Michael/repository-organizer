import { RepositoryGitHub } from './../../../types/storeReduxToolkit/repositories/asyncActions';
import { Repository } from './../../../types/storeReduxToolkit/repositories/slices';
import { User } from './../../../types/storeReduxToolkit/auth/slices';
import { AppDispatch } from './../../../types/storeReduxToolkit/configStore';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import { actions } from "../../../storeReduxToolkit/repositories/slices";

jest.mock("axios");

const mockStore = configureMockStore([thunk]);
const store = mockStore();
const mockDispatch: AppDispatch = store.dispatch;
const mockAxios = axios as jest.Mocked<typeof axios>;

export default describe("Repositories actions:", () => {
  const mockUser: User = {
    name: "21Michael",
  };
  const mockGithubRepository: RepositoryGitHub = {
    id: "testId",
    name: "testName",
    description: "testDescription",
    stargazers_count: 1,
    owner: { login: "testLogin" },
    created_at: ''
  };
  const mockEditRepository: { id: string, repo: Repository } = {
    id: "testId",
    repo: {
      _id: "testId",
      name: "testName",
      description: "testDescription",
      stars: '1',
      creatorName: "testName",
      createdAt: "2020/01/01",
    },
  };
  const mockRepository: Repository = {
    _id: 'testId',
    name: "testName",
    description: "testDescription",
    stars: '1',
    creatorName: "testName",
    createdAt: "2020/01/01",
  };
  beforeEach(() => {
    store.clearActions();
  });
  afterAll(() => jest.clearAllMocks());

  test("AddRepository success", async () => {
    const mockNewRepositoryId = "testNewRepositoryId";
    mockRepository._id = mockNewRepositoryId
    let expectedActions = [
      { type: "repositories/addRepository/pending" },
      {
        payload: { ...mockRepository },
        type: "repositories/addRepositorySuccess",
      },
      { type: "repositories/addRepository/fulfilled" },
    ];
    mockAxios.post.mockImplementation(() =>
      Promise.resolve({
        status: 201,
        headers: { location: `/repositories/${mockNewRepositoryId}` },
      })
    );
    await mockDispatch(actions.addRepository(mockRepository));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("AddRepository failed", async () => {
    let expectedActions = [
      { type: "repositories/addRepository/pending" },
      { type: "repositories/addRepository/rejected" },
    ];
    mockAxios.post.mockImplementation(() => Promise.reject());
    await mockDispatch(actions.addRepository(mockRepository));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("DeleteRepository success", async () => {
    let expectedActions = [
      { type: "repositories/deleteRepository/pending" },
      { type: "repositories/deleteRepository/fulfilled" },
    ];
    mockAxios.delete.mockImplementation(() => Promise.resolve({ status: 204 }));
    await mockDispatch(actions.deleteRepository(''));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("DeleteRepository failed", async () => {
    let expectedActions = [
      { type: "repositories/deleteRepository/pending" },
      { type: "repositories/deleteRepository/rejected" },
    ];
    mockAxios.delete.mockImplementation(() => Promise.reject());
    await mockDispatch(actions.deleteRepository(''));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("EditRepository success", async () => {

    let expectedActions = [
      { type: "repositories/editRepository/pending" },
      { type: "repositories/editRepositorySuccess" },
      { type: "repositories/editRepository/fulfilled" },
    ];
    mockAxios.put.mockImplementation(() => Promise.resolve({ status: 204 }));
    await mockDispatch(actions.editRepository(mockEditRepository));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("EditRepository failed", async () => {
    let expectedActions = [
      { type: "repositories/editRepository/pending" },
      { type: "repositories/editRepository/rejected" },
    ];
    mockAxios.put.mockImplementation(() => Promise.reject());
    await mockDispatch(actions.editRepository(mockEditRepository));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("FetchRepositories success", async () => {
    let expectedActions = [
      { type: "repositories/fetchRepositories/pending" },
      { type: "repositories/fetchRepositories/fulfilled" },
    ];
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: [] })
    );
    await mockDispatch(actions.fetchRepositories());
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("FetchRepositories failed", async () => {
    let expectedActions = [
      { type: "repositories/fetchRepositories/pending" },
      { type: "repositories/fetchRepositories/rejected" },
    ];
    mockAxios.get.mockImplementation(() => Promise.reject());
    await mockDispatch(actions.fetchRepositories());
    await expect(store.getActions()).toMatchObject(expectedActions);
  });
  test("FetchGitHubRepositories success", async () => {

    let expectedActions = [
      { type: "repositories/fetchGithubRepositories/pending" },
      { type: "repositories/fetchGithubRepositories/fulfilled" },
    ];
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: [mockGithubRepository] })
    );
    await mockDispatch(actions.fetchGithubRepositories(mockUser));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("FetchGitHubRepositories failed", async () => {
    let expectedActions = [
      { type: "repositories/fetchGithubRepositories/pending" },
      { type: "repositories/fetchGithubRepositories/rejected" },
    ];
    mockAxios.get.mockImplementation(() => Promise.reject());
    await mockDispatch(actions.fetchGithubRepositories(mockUser));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });
});
