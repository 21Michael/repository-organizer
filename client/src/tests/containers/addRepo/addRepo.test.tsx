import React from "react";
import { render, cleanup } from "@testing-library/react";
import AddRepo from "../../../containers/addRepo/addRepo";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import store from "../../../storeReduxToolkit/configStore";
import { Provider } from "react-redux";
import "mutationobserver-shim";

export default describe("addRepo: ", () => {
  afterEach(() => {
    cleanup();
  });

  test("addRepo", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AddRepo />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
