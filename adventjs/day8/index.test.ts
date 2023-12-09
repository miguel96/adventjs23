import { organizeGifts } from "./index";

describe("organizeGifts", () => {
  // it("given example", () => {
  //   expect(organizeGifts("76a11b")).toBe("[a]{a}{a}(aaaaaa){b}(b)");
  // });
  it("given only one gift should pack it in a bag", () => {
    expect(organizeGifts("1a")).toBe("(a)");
  });

  it("given 101 gift should pack it in a bag and a pale", () => {
    expect(organizeGifts("101a")).toBe("[a][a](a)");
  });

  it("given 100 gift should pack it in  and two pales", () => {
    expect(organizeGifts("100a")).toBe("[a][a]");
  });

  it("given 51 gift should pack it in a bag and a pale", () => {
    expect(organizeGifts("51a")).toBe("[a](a)");
  });

  it("given 24 gifts should pack in two boxes and 4 bags", () => {
    expect(organizeGifts("24a")).toBe("{a}{a}(aaaa)");
  });

  it("give 1 gift of three diferent types should pack in bags and return in order", () => {
    expect(organizeGifts("1a1b1c")).toBe("(a)(b)(c)");
  });
});
