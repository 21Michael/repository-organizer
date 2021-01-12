import "@testing-library/jest-dom";
import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import Notification from "../../../../components/UI/notification/notification";

export default describe("UI/notification: ", () => {
  afterEach(cleanup);
  test("notification", () => {
    const testNotification = { message: "testNotification", type: "" };
    render(<Notification notification={testNotification} />);

    expect(screen.getByText(testNotification.message)).toBeTruthy();
  });
});
