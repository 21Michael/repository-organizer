import React from "react";
import { render, cleanup } from "@testing-library/react";
import EditRepo from "../../../containers/editRepo/editRepo";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import store from "../../../storeReduxToolkit/configStore";
import { Provider } from "react-redux";
import "mutationobserver-shim";

export default describe("EditRepo: ", () => {
  afterEach(() => {
    cleanup();
  });

  test("editRepo", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <EditRepo />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
