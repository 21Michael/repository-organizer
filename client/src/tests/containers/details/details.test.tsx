import React from "react";
import { render, cleanup } from "@testing-library/react";
import Details from "../../../containers/details/details";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import store from "../../../storeReduxToolkit/configStore";
import { Provider } from "react-redux";
import "mutationobserver-shim";

export default describe("Details: ", () => {
  afterEach(() => {
    cleanup();
  });

  test("details", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
