import React from "react";
import { render, cleanup } from "@testing-library/react";
import InputList from "../../../components/inputList/inputList";

export default describe("inputList: ", () => {
  afterEach(cleanup);

  test("inputs", () => {
    const mockInput = {
      element: "input",
      name: "",
      value: "",
      type: "",
      label: "",
      autoComplete: "",
      placeholder: "",
      disabled: false,
      options: [{ value: "", label: "" }],
    };
    const testProps = {
      inputList: {
        testInput: mockInput,
        testInput2: mockInput,
        testInput3: mockInput,
      },
      errors: {},
      register: jest.fn(),
      onChangeHandler: jest.fn(),
    };
    const { container } = render(
      <InputList
        inputList={testProps.inputList}
        errors={testProps.errors}
        register={testProps.register}
        onChangeHandler={testProps.onChangeHandler}
      />
    );
    expect(container.querySelectorAll("input").length).toBe(3);
  });
});
