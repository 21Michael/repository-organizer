import "@testing-library/jest-dom";
import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import ButtonAuthNetwork from "../../../../../components/UI/buttonLink/buttonAuthNetwork/buttonAuthNetwork";

export default describe("UI/buttonAuthNetwork: ", () => {
  afterEach(cleanup);

  test("button-auth-network", () => {
    const testMessage = "Test Message";
    const testHref = "/test";
    render(
      <ButtonAuthNetwork to={testHref} icon="github" name={testMessage} />
    );
    const testElement: any = screen.getByText(`sign with ${testMessage}`);
    expect(testElement.parentElement.getAttribute("href")).toBe(testHref);
    expect(testElement).toBeTruthy();
  });
});
