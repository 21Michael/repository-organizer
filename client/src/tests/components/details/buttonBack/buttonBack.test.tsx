import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ButtonBack from "../../../../components/details/buttonBack/buttonBack";

export default describe("details/buttonBack: ", () => {
  afterEach(cleanup);

  test("buttonBack", async () => {
    const testProps = {
      label: "testLabel",
      onClick: jest.fn(),
    };
    render(<ButtonBack label={testProps.label} onClick={testProps.onClick} />);

    expect(screen.getByText("testLabel")).toBeTruthy();
    fireEvent.click(await screen.findByText("testLabel"));
    expect(testProps.onClick).toHaveBeenCalledTimes(1);
  });
});
