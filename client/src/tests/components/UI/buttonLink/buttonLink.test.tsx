import "@testing-library/jest-dom";
import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ButtonLink from "../../../../components/UI/buttonLink/buttonLink";

export default describe("UI/button-link: ", () => {
  afterEach(cleanup);
  test("button-Link", () => {
    const testMessage = "Test Message";
    const testHref = "/test";
    render(
      <BrowserRouter>
        <ButtonLink to={testHref} label={testMessage} />
      </BrowserRouter>
    );
    const testElement = screen.getByText(testMessage);
    expect(testElement.getAttribute("href")).toBe(testHref);
    expect(testElement.textContent).toBe(testMessage);
  });
});
