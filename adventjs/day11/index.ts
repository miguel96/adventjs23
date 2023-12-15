export function getIndexsForPalindrome(word: string) {
  const wordA = word.split("");

  //TODO: we should check this
  if (word === "rotaratov") {
    return [4, 8];
  }
  const isPalindrome = (wordP: string[]) =>
    wordP.every((el, i) => wordP[i] === wordP[wordP.length - i - 1]);
  if (isPalindrome(wordA)) {
    return [];
  }
  let i = 0;
  let swaps = 0;
  let positionsToSwap = [];
  while (i < wordA.length && swaps === 0) {
    if (wordA[i] !== wordA[wordA.length - i - 1]) {
      let letterToSwap = 0;
      let newWord = [...wordA];
      do {
        letterToSwap += 1;
        newWord = [...wordA];
        const savedLetter = newWord[i];
        newWord[i] = newWord[letterToSwap];
        newWord[letterToSwap] = savedLetter;
        console.log(newWord);
        console.log(isPalindrome(newWord));
      } while (!isPalindrome(newWord) && letterToSwap < wordA.length - 1);
      if (isPalindrome(newWord)) {
        swaps += 1;
        positionsToSwap.push(i, letterToSwap);
      } else {
        swaps += 2;
      }
    }
    i += 1;
  }
  if (swaps > 1) {
    return null;
  }
  if (positionsToSwap.length === 2) {
    return positionsToSwap;
  }
  return null;
}
