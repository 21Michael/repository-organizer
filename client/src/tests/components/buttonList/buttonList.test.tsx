import React from "react";
import { render, cleanup } from "@testing-library/react";
import ButtonList from "../../../components/buttonList/buttonList";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

export default describe("buttonList: ", () => {
  afterEach(cleanup);

  test("buttonList", () => {
    const testProps = {
      buttonList: {
        testButton: {
          type: "submit",
          label: "",
          name: "",
          to: "",
        },
        testButton2: {
          type: "link",
          to: "",
          label: "",
          name: "",
        },
        testButton3: {
          type: "network",
          label: "",
          name: "",
          to: "",
        },
      },
    };
    const { container } = render(
      <BrowserRouter>
        <ButtonList buttonList={testProps.buttonList} />
      </BrowserRouter>
    );

    expect(container.querySelectorAll("button").length).toBe(1);
    expect(container.querySelectorAll("a").length).toBe(2);
  });
});
