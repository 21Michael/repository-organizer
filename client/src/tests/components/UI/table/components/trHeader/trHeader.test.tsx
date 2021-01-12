import "@testing-library/jest-dom";
import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TrHeader from "../../../../../../components/UI/table/components/trHeader/trHeader";

export default describe("UI/trHeader: ", () => {
  const testProps = {
    user: { signedBy: "local" },
    titles: ["testTitle"],
    signedIn: true,
    page: "note",
  };

  afterEach(cleanup);

  test("Valid data", () => {
    const { container } = render(
      <TrHeader
        user={testProps.user}
        titles={testProps.titles}
        signedIn={testProps.signedIn}
        page={testProps.page}
      />
    );

    expect(screen.getByText("testTitle").textContent).toContain("testTitle");
  });

  test("User signed in", () => {
    const { container } = render(
      <TrHeader
        user={testProps.user}
        titles={testProps.titles}
        signedIn={testProps.signedIn}
        page={testProps.page}
      />
    );

    expect(container.querySelectorAll("th").length).toBe(2);
  });

  test("User doesn't signed in", () => {
    testProps.signedIn = false;
    const { container } = render(
      <TrHeader
        user={testProps.user}
        titles={testProps.titles}
        signedIn={testProps.signedIn}
        page={testProps.page}
      />
    );

    expect(container.querySelectorAll("th").length).toBe(1);
  });
});
