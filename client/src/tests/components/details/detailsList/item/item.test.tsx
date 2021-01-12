import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Item from "../../../../../components/details/detailsList/item/item";

export default describe("details/item: ", () => {
  afterEach(cleanup);

  test("detailsItem", () => {
    const testProps = {
      label: "testLabel",
      details: "testDetails",
    };
    render(<Item label={testProps.label} details={testProps.details} />);

    expect(screen.getByText(`${testProps.label}:`)).toBeTruthy();
    expect(screen.getByText(testProps.details)).toBeTruthy();
  });
});
