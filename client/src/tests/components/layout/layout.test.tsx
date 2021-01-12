import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import store from "../../../storeReduxToolkit/configStore";
import Layout from "../../../components/layout/layout";
import { createMemoryHistory } from "history";

export default describe("layout: ", () => {
  const history = createMemoryHistory();
  let container: Element;
  beforeEach(() => {
    container = render(
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
    ).container;
  });
  afterAll(cleanup);

  test("Route: /note", () => {
    history.push("/note");
    expect(container.querySelector("main")).toMatchSnapshot();
  });

  test("Route: /", () => {
    history.push("/");
    expect(container.querySelector("main")).toMatchSnapshot();
  });

  test("Route: /repository/details", () => {
    history.push("/repository/details");
    expect(container.querySelector("main")).toMatchSnapshot();
  });

  test("Route: /signin", () => {
    history.push("/signin");
    expect(container.querySelector("main")).toMatchSnapshot();
  });

  test("Route: /signup", () => {
    history.push("/signup");
    expect(container.querySelector("main")).toMatchSnapshot();
  });
});
