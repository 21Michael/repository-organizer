import "@testing-library/jest-dom";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ErrorBoundary from "../../../hoc/errorBoundary/errorBoundary";

export default describe("HOC: errorBoundary: ", () => {
  afterEach(cleanup);

  test("error", () => {
    const testProps = {
      error: "testError",
      errorInfo: { componentStack: "testErrorInfo" },
      children: {},
    };
    const { container } = render(
      <ErrorBoundary
        error={testProps.error}
        errorInfo={testProps.errorInfo}
        children={testProps.children}
      />
    );

    expect(container.querySelector("details")?.textContent).toContain(
      testProps.error
    );
    expect(container.querySelector("details")?.textContent).toContain(
      testProps.errorInfo.componentStack
    );
  });
});
