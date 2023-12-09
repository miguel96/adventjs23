export function organizeGifts(gifts: string) {
  // Parse gifts
  let regexp = /([0-9]+[a-zA-Z])/g;
  return Array.from(gifts.matchAll(regexp))
    .map(([, giftToParse]) => {
      const giftId = giftToParse.charAt(giftToParse.length - 1);
      let count = Number(giftToParse.replace(giftId, ""));
      let pales = 0;
      while (count >= 50) {
        pales += 1;
        count -= 50;
      }
      let boxes = 0;
      while (count >= 10) {
        boxes += 1;
        count -= 10;
      }
      let bags = count ? "(" + giftId.repeat(count) + ")" : "";
      let palesStr = `[${giftId}]`.repeat(pales);
      let giftsStr = `{${giftId}}`.repeat(boxes);
      return `${palesStr}${giftsStr}${bags}`;
    })
    .join("");
}
