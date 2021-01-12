import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DetailsList from "../../../../components/details/detailsList/detailsList";

export default describe("details/list: ", () => {
  afterEach(cleanup);

  test("detailsList", () => {
    const testProps = {
      title: "testName",
      dataList: {
        label: "testItem",
        label2: "testItem2",
      },
    };
    const { container } = render(
      <DetailsList title={testProps.title} dataList={testProps.dataList} />
    );

    expect(screen.getByText(testProps.title)).toBeTruthy;
    expect(container.querySelectorAll("li").length).toBe(2);
  });
});
