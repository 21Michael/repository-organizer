import "@testing-library/jest-dom";
import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import Form from "../../../../components/UI/form/form";

export default describe("UI/form: ", () => {
  afterEach(cleanup);

  test("form", () => {
    const testProps = {
      form: {
        title: "testMessage",
        inputList: {},
        buttonList: {},
      },
    };
    render(
      <Form
        form={testProps.form}
        onSubmit={jest.fn()}
        onChangeHandler={jest.fn()}
      />
    );

    expect(screen.getByText(testProps.form.title)).toBeTruthy();
  });
});
