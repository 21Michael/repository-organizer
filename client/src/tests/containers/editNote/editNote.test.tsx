import React from "react";
import { render, cleanup } from "@testing-library/react";
import EditNote from "../../../containers/editNote/editNote";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import store from "../../../storeReduxToolkit/configStore";
import { Provider } from "react-redux";
import "mutationobserver-shim";

export default describe("EditNote: ", () => {
  afterEach(() => {
    cleanup();
  });

  test("editNote", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <EditNote />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
