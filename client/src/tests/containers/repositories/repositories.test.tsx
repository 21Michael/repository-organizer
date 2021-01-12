import React from "react";
import { render, cleanup } from "@testing-library/react";
import Repositories from "../../../containers/repositories/repositories";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import store from "../../../storeReduxToolkit/configStore";
import { Provider } from "react-redux";
import "mutationobserver-shim";

export default describe("Repositories: ", () => {
  afterEach(() => {
    cleanup();
  });

  test("repositories", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Repositories />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
