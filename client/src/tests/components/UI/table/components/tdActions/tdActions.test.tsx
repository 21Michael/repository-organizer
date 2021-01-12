import "@testing-library/jest-dom";
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import TdActions from "../../../../../../components/UI/table/components/tdActions/tdActions";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

export default describe("UI/table: ", () => {
  afterEach(cleanup);
  test("table", () => {
    const testProps = {
      id: "testId",
      repositoryId: "repositoryId",
      state: "",
      deleteRowHandler: jest.fn(),
    };
    const { container } = render(
      <BrowserRouter>
        <TdActions
          id={testProps.id}
          state={testProps.state}
          repositoryId={testProps.repositoryId}
          deleteRowHandler={testProps.deleteRowHandler}
        />
      </BrowserRouter>
    );

    const testLinkHref = container.querySelector("a")?.getAttribute("href");
    expect(testLinkHref).toContain(testProps.id);
    expect(testLinkHref).toContain(testProps.repositoryId);
    container.querySelector("button")?.click();
    expect(testProps.deleteRowHandler).toHaveBeenCalledTimes(1);
  });
});
