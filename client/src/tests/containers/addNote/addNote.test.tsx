import React from "react";
import { render, cleanup } from "@testing-library/react";
import AddNote from "../../../containers/addNote/addNote";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "mutationobserver-shim";
import store from "../../../storeReduxToolkit/configStore";

export default describe("addNote: ", () => {
  afterEach(() => {
    cleanup();
  });

  test("addNote", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AddNote />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
