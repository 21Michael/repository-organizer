import "@testing-library/jest-dom";
import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import TextArea from "../../../../../components/UI/input/textArea/textArea";

export default describe("UI/textArea: ", () => {
  afterEach(cleanup);

  test("text-area", () => {
    const testProps = {
      name: "",
      placeholder: "testPlaceholder",
      error: { message: "testError" },
      onChangeHandler: jest.fn(),
    };
    const { container } = render(
      <TextArea
        name={testProps.name}
        placeholder={testProps.placeholder}
        error={testProps.error}
        register={jest.fn()}
        onChangeHandler={testProps.onChangeHandler}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(testProps.placeholder), {
      target: { value: "testData" },
    });
    expect(container.querySelector("textarea")?.value).toBe("testData");
    expect(testProps.onChangeHandler).toHaveBeenCalledTimes(1);
    expect(container.querySelector("textarea")?.placeholder).toBe(
      testProps.placeholder
    );
    expect(container.querySelector("span")?.textContent).toBe(
      testProps.error.message
    );
  });
});
