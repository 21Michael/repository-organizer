import "@testing-library/jest-dom";
import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Link from "../../../../components/UI/link/link";

export default describe("UI/link: ", () => {
  afterEach(cleanup);
  test("link", () => {
    const testHref = "/test";
    const testChildren = "testChildren";
    render(
      <BrowserRouter>
        <Link to={testHref}>{testChildren}</Link>
      </BrowserRouter>
    );
    const testElement = screen.getByText(testChildren);
    expect(testElement).toBeTruthy();
    expect(testElement.getAttribute("href")).toBe(testHref);
  });
});
