import "@testing-library/jest-dom";
import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Table from "../../../../components/UI/table/table";

export default describe("UI/table: ", () => {
  const testProps = {
    tableHeader: {
      titles: ["test"],
    },
    user: {
      signedBy: "local",
    },
    signedIn: true,
    page: "note",
    deleteRowHandler: jest.fn(),
    tableBody: [
      {
        _id: "testId",
        data: "testData",
        id: "",
        repositoryId: "",
        text: "",
        createdAt: "",
      },
    ],
  };
  afterEach(cleanup);

  test("Valid data", async () => {
    const { container } = render(
      <BrowserRouter>
        <Table
          tableHeader={testProps.tableHeader}
          tableBody={testProps.tableBody}
          deleteRowHandler={testProps.deleteRowHandler}
          page={testProps.page}
          signedIn={testProps.signedIn}
          user={testProps.user}
        />
      </BrowserRouter>
    );

    expect(container.querySelector("tbody")).toBeInTheDocument();
    expect(container.querySelector("thead")).toBeInTheDocument();
    expect(container.querySelector("td")?.textContent).toContain("testData");
  });

  test("User signed in", () => {
    const { container } = render(
      <BrowserRouter>
        <Table
          tableHeader={testProps.tableHeader}
          tableBody={testProps.tableBody}
          deleteRowHandler={testProps.deleteRowHandler}
          page={testProps.page}
          signedIn={testProps.signedIn}
          user={testProps.user}
        />
      </BrowserRouter>
    );

    expect(container.querySelectorAll("td").length).toBe(6);
    expect(container.querySelectorAll("th").length).toBe(2);
  });

  test("User doesn't signed in", () => {
    testProps.signedIn = false;
    const { container } = render(
      <BrowserRouter>
        <Table
          tableHeader={testProps.tableHeader}
          tableBody={testProps.tableBody}
          deleteRowHandler={testProps.deleteRowHandler}
          page={testProps.page}
          signedIn={testProps.signedIn}
          user={testProps.user}
        />
      </BrowserRouter>
    );
    expect(container.querySelectorAll("td").length).toBe(5);
    expect(container.querySelectorAll("th").length).toBe(1);
  });
});
