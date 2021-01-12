import moment from "moment";
import Time from "../../utiles/time";

export default describe("Utiles: time: ", () => {
  let mockUserDate: Date = new Date("1999/07/07");
  test("constructor", () => {
    expect(Time(mockUserDate)._userDate.format("MM/DD/YYYY")).toEqual(
      moment(mockUserDate).format("MM/DD/YYYY")
    );
    expect(Time()._now.format("MM/DD/YYYY")).toEqual(
      moment().format("MM/DD/YYYY")
    );
  });

  test("durationDays", () => {
    expect(Time(mockUserDate).durationDays()).toEqual(
      moment.duration(moment(mockUserDate).diff(moment())).days()
    );
  });

  test("addDays", () => {
    const mockAddDays = 1;
    expect(Time().addDays(mockAddDays).format("MM/DD/YYYY")).toEqual(
      moment().add(mockAddDays, "days").format("MM/DD/YYYY")
    );
  });

  test("isFuture", () => {
    expect(Time(mockUserDate).isFuture()).toEqual(false);
  });

  test("toDateInputValue", () => {
    const mockDate: Date = new Date("1995-12-17T03:24:00");
    const mockDateInputFormat: string = "1995-12-17";
    expect(Time().toDateInputValue(mockDate)).toEqual(mockDateInputFormat);
  });
});
