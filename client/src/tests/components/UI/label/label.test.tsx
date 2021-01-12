import "@testing-library/jest-dom";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import Label from "../../../../components/UI/label/label";

export default describe("UI/label: ", () => {
  afterEach(cleanup);
  test("label", () => {
    const testLabel = "testLabel";
    const testChildren = "testChildren";
    const { container } = render(
      <Label label={testLabel}>{testChildren}</Label>
    );

    expect(container.textContent).toContain(testLabel);
    expect(container.textContent).toContain(testChildren);
  });
});
