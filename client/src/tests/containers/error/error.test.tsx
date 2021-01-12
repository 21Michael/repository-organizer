import React from "react";
import { render, cleanup } from "@testing-library/react";
import Error from "../../../containers/error/error";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import store from "../../../storeReduxToolkit/configStore";
import { Provider } from "react-redux";
import "mutationobserver-shim";

export default describe("Error: ", () => {
  afterEach(() => {
    cleanup();
  });

  test("error", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Error />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
