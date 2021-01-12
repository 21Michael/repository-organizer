import reducer from "../../../storeReduxToolkit/auth/slices";
import { InitialState } from "../../../types/storeReduxToolkit/auth/slices";

export default describe("Auth slice:", () => {
  const initialState: InitialState = {
    user: undefined,
    signedIn: false,
    signedUpSuccess: false,
    notification: null,
  };
  afterAll(() => jest.clearAllMocks());

  test("signOutUserSuccess action", () => {
    initialState.signedIn = true;
    const actual = reducer(initialState, {
      type: "auth/signOutUserSuccess",
    });
    expect(actual.signedIn).toBe(!initialState.signedIn);
  });

  test("signUpUserSuccess action", () => {
    initialState.signedUpSuccess = false;
    const actual = reducer(initialState, {
      type: "auth/signUpUserSuccess",
    });
    expect(actual.signedUpSuccess).toBe(!initialState.signedUpSuccess);
  });

  test("signUpUserFailed action", () => {
    initialState.signedUpSuccess = true;
    const actual = reducer(initialState, {
      type: "auth/signUpUserFailed",
    });
    expect(actual.signedUpSuccess).toBe(!initialState.signedUpSuccess);
  });

  test("showNotification action", () => {
    initialState.notification = null;
    const mockPayload = { message: "testMessage", type: "testType" };
    const actual = reducer(initialState, {
      payload: mockPayload,
      type: "auth/showNotification",
    });
    expect(actual.notification).toEqual(mockPayload);
  });

  test("hideNotification action", () => {
    initialState.notification = { message: "testMessage", type: "testType" };
    const actual = reducer(initialState, {
      type: "auth/hideNotification",
    });
    expect(actual.notification).toBe(null);
  });

  test("fetchCurrentUser action", () => {
    initialState.user = undefined;
    initialState.signedIn = false;
    const mockPayload = {
      name: "testName",
      id: "testId",
      email: "testEmail",
      password: "testPassword",
    };
    const actual = reducer(initialState, {
      payload: mockPayload,
      type: "auth/fetchCurrentUser/fulfilled",
    });
    expect(actual.user).toEqual(mockPayload);
    expect(actual.signedIn).toBe(!initialState.signedIn);
  });

  test("signOutUser action", () => {
    initialState.user = {};
    initialState.signedIn = true;
    const actual = reducer(initialState, {
      type: "auth/signOutUser/fulfilled",
    });
    expect(actual.user).toBe(undefined);
    expect(actual.signedIn).toBe(!initialState.signedIn);
  });
});
