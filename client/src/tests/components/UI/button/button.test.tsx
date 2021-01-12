import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import Button from "../../../../components/UI/button/button";

export default describe("UI/button: ", () => {
  afterEach(cleanup);

  test("button label text", () => {
    const testMessage = "Test Message";
    const onClickMock = jest.fn();
    render(<Button label={testMessage} onClick={onClickMock} />);

    fireEvent.click(screen.getByText(testMessage));
    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText(testMessage).textContent).toBe(testMessage);
  });
});
