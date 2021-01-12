import { User } from './../../../types/storeReduxToolkit/auth/slices';
import { AppDispatch } from './../../../types/storeReduxToolkit/configStore';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import { actions } from "../../../storeReduxToolkit/auth/slices";

jest.mock('axios');

const mockStore = configureMockStore([thunk]);
const store = mockStore();
const mockDispatch: AppDispatch = store.dispatch;
const mockAxios = axios as jest.Mocked<typeof axios>;

export default describe("Auth actions", () => {
  const mockResponseSuccess: string = "testSuccess";
  const mockResponseFailed: string = "testError";
  const mockUser: User = {
    id: "testId",
    name: "testName",
    email: "testEmail",
    password: "testPassword",
    signedBy: "local",
  };
  beforeEach(() => {
    store.clearActions();
  });
  afterAll(() => jest.clearAllMocks());

  test("SignUp success", async () => {
    let expectedActions = [
      { type: "auth/signUpUser/pending" },
      { type: "auth/signUpUserSuccess" },
      {
        payload: { message: mockResponseSuccess, type: "success" },
        type: "auth/showNotification",
      },
      { type: "auth/signUpUser/fulfilled" },
    ];
    mockAxios.post.mockImplementation((url) =>
      url === "/auth/sign-up"
        ? Promise.resolve({ status: 201, data: mockResponseSuccess })
        : Promise.reject()
    );
    await mockDispatch(actions.signUpUser(mockUser));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("SignUp failed", async () => {
    let expectedActions = [
      { type: "auth/signUpUser/pending" },
      {
        payload: { message: mockResponseFailed, type: "error" },
        type: "auth/showNotification",
      },
      { type: "auth/signUpUser/rejected" },
    ];
    mockAxios.post.mockImplementation((url) =>
      url === "/auth/sign-up"
        ? Promise.reject({ response: { data: mockResponseFailed } })
        : Promise.resolve()
    );
    await mockDispatch(actions.signUpUser(mockUser));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("SignIn success", async () => {
    let expectedActions = [
      { type: "auth/signInUser/pending" },
      { type: "auth/fetchCurrentUser/pending" },
      { type: "repositories/fetchRepositories/pending" },
      { type: "auth/signInUser/fulfilled" },
      { type: "auth/fetchCurrentUser/rejected" },
      { type: "repositories/fetchRepositories/fulfilled" },
    ];
    mockAxios.post.mockImplementation((url) =>
      url === "/auth/sign-in"
        ? Promise.resolve({ status: 200, data: mockResponseSuccess })
        : Promise.reject()
    );
    await mockDispatch(actions.signInUser(mockUser));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("SignIn failed", async () => {
    let expectedActions = [
      { type: "auth/signInUser/pending" },
      {
        payload: { message: mockResponseFailed, type: "error" },
        type: "auth/showNotification",
      },
      { type: "auth/signInUser/rejected" },
    ];
    mockAxios.post.mockImplementation((url) =>
      url === "/auth/sign-in"
        ? Promise.reject({ response: { data: mockResponseFailed } })
        : Promise.resolve()
    );
    await mockDispatch(actions.signInUser(mockUser));
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("FetchCurrentUser success", async () => {
    let expectedActions = [
      { type: "auth/fetchCurrentUser/pending" },
      { type: "repositories/fetchRepositories/pending" },
      { type: "notes/fetchNotes/pending" },
      { type: "auth/fetchCurrentUser/fulfilled" },
    ];
    mockAxios.get.mockImplementation((url) =>
      url === "/auth/current-user"
        ? Promise.resolve({ status: 200, data: mockUser })
        : Promise.reject()
    );
    await mockDispatch(actions.fetchCurrentUser());
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("FetchCurrentUser failed", async () => {
    let expectedActions = [
      { type: "auth/fetchCurrentUser/pending" },
      { type: "repositories/fetchRepositories/pending" },
      { type: "auth/fetchCurrentUser/rejected" },
    ];
    mockAxios.get.mockImplementation((url) =>
      url === "/auth/current-user"
        ? Promise.reject({ response: { data: mockResponseFailed } })
        : Promise.resolve()
    );
    await mockDispatch(actions.fetchCurrentUser());
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("SignOut success", async () => {
    let expectedActions = [
      { type: "auth/signOutUser/pending" },
      { type: "auth/signOutUserSuccess" },
      { type: "auth/fetchCurrentUser/pending" },
      { type: "repositories/fetchRepositories/pending" },
      { type: "auth/signOutUser/fulfilled" },
    ];
    mockAxios.get.mockImplementation((url) =>
      url === "/auth/sign-out"
        ? Promise.resolve({ status: 200, data: mockResponseSuccess })
        : Promise.reject()
    );
    await mockDispatch(actions.signOutUser());
    await expect(store.getActions()).toMatchObject(expectedActions);
  });

  test("SignOut failed", async () => {
    let expectedActions = [
      { type: "auth/signOutUser/pending" },
      { type: "auth/signOutUser/rejected" },
    ];
    mockAxios.get.mockImplementation((url) =>
      url === "/auth/sign-out"
        ? Promise.reject({ response: { data: mockResponseFailed } })
        : Promise.resolve()
    );
    await mockDispatch(actions.signOutUser());
    await expect(store.getActions()).toMatchObject(expectedActions);
  });
});
