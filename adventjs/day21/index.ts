export function findBalancedSegment(message: (0 | 1)[]) {
  const isSameSegment = (toTest: (0 | 1)[]) => {
    return (
      toTest.length &&
      toTest.reduce<number>((prevVal, element) => prevVal + element, 0) * 2 ===
        toTest.length
    );
  };
  let maxSegment: [number, number] | [] = [];
  let startIndex = 0;

  function getStringLength() {
    return (maxSegment[1] || 0) - (maxSegment[0] || 0);
  }

  while (startIndex < message.length) {
    let testString = message.slice(startIndex);
    while (!isSameSegment(testString) && testString.length) {
      testString = testString.slice(0, -1);
    }

    if (
      isSameSegment(testString) &&
      testString.length > getStringLength() + 1
    ) {
      maxSegment = [startIndex, startIndex + testString.length - 1];
    }
    startIndex += 1;
  }

  return maxSegment;
}
