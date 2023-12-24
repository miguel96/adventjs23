import { drawClock } from "./index";

describe("drawClock", () => {
  it("should render a full clock", () => {
    expect(drawClock("01:30")).toStrictEqual([
      [
        "*",
        "*",
        "*",
        " ",
        " ",
        " ",
        "*",
        " ",
        " ",
        " ",
        "*",
        "*",
        "*",
        " ",
        "*",
        "*",
        "*",
      ],
      [
        "*",
        " ",
        "*",
        " ",
        " ",
        " ",
        "*",
        " ",
        " ",
        " ",
        " ",
        " ",
        "*",
        " ",
        "*",
        " ",
        "*",
      ],
      [
        "*",
        " ",
        "*",
        " ",
        " ",
        " ",
        "*",
        " ",
        "*",
        " ",
        " ",
        " ",
        "*",
        " ",
        "*",
        " ",
        "*",
      ],
      [
        "*",
        " ",
        "*",
        " ",
        " ",
        " ",
        "*",
        " ",
        " ",
        " ",
        "*",
        "*",
        "*",
        " ",
        "*",
        " ",
        "*",
      ],
      [
        "*",
        " ",
        "*",
        " ",
        " ",
        " ",
        "*",
        " ",
        "*",
        " ",
        " ",
        " ",
        "*",
        " ",
        "*",
        " ",
        "*",
      ],
      [
        "*",
        " ",
        "*",
        " ",
        " ",
        " ",
        "*",
        " ",
        " ",
        " ",
        " ",
        " ",
        "*",
        " ",
        "*",
        " ",
        "*",
      ],
      [
        "*",
        "*",
        "*",
        " ",
        " ",
        " ",
        "*",
        " ",
        " ",
        " ",
        "*",
        "*",
        "*",
        " ",
        "*",
        "*",
        "*",
      ],
    ]);
  });
});