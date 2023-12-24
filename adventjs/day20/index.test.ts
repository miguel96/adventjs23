import { distributeGifts } from "./index";

describe("distributeGifts", () => {
  it("two gifts in a row", () => {
    expect(distributeGifts([[1, 3]])).toStrictEqual([[2, 2]]);
  });
});
