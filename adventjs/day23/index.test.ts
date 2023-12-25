import { organizeChristmasDinner } from "./index";

describe("organizeChristmasDinner", () => {
  it("group ingredients in two or more dishes", () => {
    expect(
      organizeChristmasDinner([
        ["plato1", "ingrediente"],
        ["plato2", "ingrediente"],
      ]),
    ).toStrictEqual([["ingrediente", "plato1", "plato2"]]);
  });
  it("hide ingredients in only one dishes", () => {
    expect(
      organizeChristmasDinner([
        ["plato1", "ingrediente"],
        ["plato2", "ingrediente2"],
      ]),
    ).toStrictEqual([]);
  });
  it("sorts ingredients alfabetically", () => {
    expect(
      organizeChristmasDinner([
        ["plato1", "ingrediente2", "ingrediente1"],
        ["plato2", "ingrediente2", "ingrediente1"],
      ]),
    ).toStrictEqual([
      ["ingrediente1", "plato1", "plato2"],
      ["ingrediente2", "plato1", "plato2"],
    ]);
  });

  it("sorts dishes alfabetically", () => {
    expect(
      organizeChristmasDinner([
        ["plato2", "ingrediente1", "ingrediente2"],
        ["plato1", "ingrediente1", "ingrediente2"],
      ]),
    ).toStrictEqual([
      ["ingrediente1", "plato1", "plato2"],
      ["ingrediente2", "plato1", "plato2"],
    ]);
  });
});
