import { getIndexsForPalindrome } from "./index";

describe("getIndexsForPalindrome", () => {
  it("given a palindrome returns []", () => {
    expect(getIndexsForPalindrome("a")).toStrictEqual([]);
  });

  it("given a non palindrome (even with one swap) returns null", () => {
    expect(getIndexsForPalindrome("ababc")).toStrictEqual(null);
  });

  it("given a one swap palindrome returns positions", () => {
    expect(getIndexsForPalindrome("abab")).toStrictEqual([0, 1]);
  });

  it("given a one swap palindrome with a different letter returns positions", () => {
    expect(getIndexsForPalindrome("abac")).toStrictEqual(null);
  });

  it("given a long palindrome with one swap returns positions", () => {
    expect(getIndexsForPalindrome("aaababa")).toStrictEqual([1, 3]);
  });

  it("given rotaratov returns 4,8", () => {
    expect(getIndexsForPalindrome("rotaratov")).toStrictEqual([4, 8]);
  });
});
