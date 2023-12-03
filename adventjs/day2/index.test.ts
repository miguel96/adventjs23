import manufacture from "./index";

describe("day2", () => {
  const data: {
    gifts: string[];
    materials: string;
    resp: string[];
  }[] = [
    {
      gifts: ["tren", "oso", "pelota"],
      materials: "tronesa",
      resp: ["tren", "oso"],
    },
    {
      gifts: ["juego", "puzzle"],
      materials: "jlepuz",
      resp: ["puzzle"],
    },
    {
      gifts: ["libro", "ps5"],
      materials: "psli",
      resp: [],
    },
  ];
  it.each(data)(
    "should return %p given %p gitfs and %p materials",
    (element) => {
      expect(manufacture(element.gifts, element.materials)).toStrictEqual(
        element.resp,
      );
    },
  );
});
