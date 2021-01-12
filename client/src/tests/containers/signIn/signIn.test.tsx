import React from "react";
import { render, cleanup } from "@testing-library/react";
import SignIn from "../../../containers/signIn/signIn";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import store from "../../../storeReduxToolkit/configStore";
import { Provider } from "react-redux";
import "mutationobserver-shim";

export default describe("SignIn: ", () => {
  afterEach(() => {
    cleanup();
  });

  test("signIn", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
