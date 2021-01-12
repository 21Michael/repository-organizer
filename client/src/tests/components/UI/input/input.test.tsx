import "@testing-library/jest-dom";
import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import Input from "../../../../components/UI/input/input";

export default describe("UI/input: ", () => {
  afterEach(cleanup);

  test("input", () => {
    const testProps = {
      name: "",
      type: "",
      placeholder: "testPlaceholder",
      error: { message: "testError" },
      onChangeHandler: jest.fn(),
    };
    const { container }: any = render(
      <Input
        name={testProps.name}
        type={testProps.type}
        placeholder={testProps.placeholder}
        error={testProps.error}
        register={jest.fn()}
        onChangeHandler={testProps.onChangeHandler}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(testProps.placeholder), {
      target: { value: "testData" },
    });
    expect(container.querySelector("input").value).toBe("testData");
    expect(testProps.onChangeHandler).toHaveBeenCalledTimes(1);
    expect(container.querySelector("input").placeholder).toBe(
      testProps.placeholder
    );
    expect(container.querySelector("span").textContent).toBe(
      testProps.error.message
    );
  });
});
