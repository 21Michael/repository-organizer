import "@testing-library/jest-dom";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import TrBody from "../../../../../../components/UI/table/components/trBody/trBody";

export default describe("UI/trBody: ", () => {
  const testProps = {
    user: { signedBy: "local" },
    trData: {
      _id: "testId",
      data: "testData",
      id: "",
      repositoryId: "",
      text: "",
      createdAt: "",
    },
    signedIn: true,
    page: "note",
    deleteRowHandler: jest.fn(),
  };
  afterEach(cleanup);

  test("Valid data", () => {
    const { container } = render(
      <BrowserRouter>
        <TrBody
          user={testProps.user}
          trData={testProps.trData}
          signedIn={testProps.signedIn}
          page={testProps.page}
          deleteRowHandler={testProps.deleteRowHandler}
        />
      </BrowserRouter>
    );

    expect(container.querySelector("a")?.getAttribute("href")).toContain(
      "testId"
    );
    expect(container.querySelector("td")?.textContent).toContain("testData");
  });

  test("User signed in", () => {
    const { container } = render(
      <BrowserRouter>
        <TrBody
          user={testProps.user}
          trData={testProps.trData}
          signedIn={testProps.signedIn}
          page={testProps.page}
          deleteRowHandler={testProps.deleteRowHandler}
        />
      </BrowserRouter>
    );

    expect(container.querySelectorAll("td").length).toBe(6);
  });

  test("User doesn't signed in", () => {
    testProps.signedIn = false;
    const { container } = render(
      <BrowserRouter>
        <TrBody
          user={testProps.user}
          trData={testProps.trData}
          signedIn={testProps.signedIn}
          page={testProps.page}
          deleteRowHandler={testProps.deleteRowHandler}
        />
      </BrowserRouter>
    );

    expect(container.querySelectorAll("td").length).toBe(5);
  });
});
