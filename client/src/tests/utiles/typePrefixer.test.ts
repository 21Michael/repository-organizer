import typePrefixer from "../../utiles/typePrefixer";

export default describe("Utiles: typePrefixer: ", () => {
  let mockTypes = { test: "test" };
  test("typePrefixer", () => {
    expect(typePrefixer(mockTypes)).toEqual({
      test: "repository-organizer/test",
    });
  });
});
