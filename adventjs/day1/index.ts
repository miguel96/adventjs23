function findFirstRepeated(gifts:number[]) {
    const foundNumbers = new Set();

    return gifts.find(function (giftNumber:number){
        if(foundNumbers.has(giftNumber)){
            return true;
        }
        foundNumbers.add(giftNumber);
        return false;
    })??-1
}

export const findFirstRepeatedE = findFirstRepeated;


