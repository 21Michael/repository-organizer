import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavList from "../../../../components/header/navList/navList";

export default describe("header/inputList: ", () => {
  afterEach(cleanup);

  test("input", () => {
    const testProps = {
      navList: [
        {
          to: "/test",
          text: "testText",
        },
        {
          to: "/test2",
          text: "testText2",
        },
      ],
    };
    const { container } = render(
      <BrowserRouter>
        <NavList navList={testProps.navList} />
      </BrowserRouter>
    );

    expect(container.querySelectorAll("li").length).toBe(2);
  });
});
