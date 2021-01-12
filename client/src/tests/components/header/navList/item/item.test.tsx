import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Item from "../../../../../components/header/navList/item/item";

export default describe("header/inputList: ", () => {
  afterEach(cleanup);

  test("input", () => {
    const testProps = {
      item: {
        to: "/test",
        text: "testText",
      },
    };
    render(
      <BrowserRouter>
        <Item item={testProps.item} />
      </BrowserRouter>
    );

    const testLink = screen.getByText(testProps.item.text);
    expect(testLink).toBeTruthy();
    expect(testLink.getAttribute("href")).toBe(testProps.item.to);
  });
});
