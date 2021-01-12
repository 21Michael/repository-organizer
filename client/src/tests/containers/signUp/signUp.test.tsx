import React from "react";
import { render, cleanup } from "@testing-library/react";
import SignUp from "../../../containers/signUp/signUp";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import store from "../../../storeReduxToolkit/configStore";
import { Provider } from "react-redux";
import "mutationobserver-shim";

export default describe("SignUp: ", () => {
  afterEach(() => {
    cleanup();
  });

  test("signUp", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
