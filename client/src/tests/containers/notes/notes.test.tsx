import React from "react";
import { render, cleanup } from "@testing-library/react";
import Notes from "../../../containers/notes/notes";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import store from "../../../storeReduxToolkit/configStore";
import { Provider } from "react-redux";
import "mutationobserver-shim";

export default describe("Notes: ", () => {
  afterEach(() => {
    cleanup();
  });

  test("notes", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Notes />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
