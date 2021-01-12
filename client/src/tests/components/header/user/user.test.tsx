import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import User from "../../../../components/header/user/user";

export default describe("header/user: ", () => {
  const testProps = {
    name: "testName",
    profileURL: "testURL",
    avatarURL: "testURL",
    logOutButton: {
      classModifier: "",
      name: "",
      label: "",
    },
    logOutButtonHandler: jest.fn(),
  };
  afterEach(cleanup);

  test("user github", () => {
    testProps.profileURL = "testURL";
    testProps.avatarURL = "testURL";
    const { container } = render(
      <User
        name={testProps.name}
        profileURL={testProps.profileURL}
        avatarURL={testProps.avatarURL}
        logOutButton={testProps.logOutButton}
        logOutButtonHandler={testProps.logOutButtonHandler}
      />
    );

    expect(container.querySelector("span")?.textContent).toBe(testProps.name);
    expect(container.querySelector("a")?.getAttribute("href")).toBe(
      testProps.profileURL
    );
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      testProps.avatarURL
    );
  });

  test("user local", () => {
    const { container } = render(
      <User
        name={testProps.name}
        logOutButton={testProps.logOutButton}
        logOutButtonHandler={testProps.logOutButtonHandler}
      />
    );

    expect(container.querySelector("span")?.textContent).toBe(testProps.name);
    expect(container.querySelector("a")).not.toBeInTheDocument();
  });
});
