/*
const giftIds = [2, 1, 3, 5, 3, 2]
const firstRepeatedId = findFirstRepeated(giftIds)
console.log(firstRepeatedId) // 3
// Aunque el 2 y el 3 se repiten
// el 3 aparece primero por segunda vez

const giftIds2 = [1, 2, 3, 4]
const firstRepeatedId2 = findFirstRepeated(giftIds2)
console.log(firstRepeatedId2) // -1
// Es -1 ya que no se repite ningún número

const giftIds3 = [5, 1, 5, 1]
const firstRepeatedId3 = findFirstRepeated(giftIds3)
console.log(firstRepeatedId3) // 5
 */
import {findFirstRepeatedE} from "./index";
describe('user stories',()=>{
    const inputs:{input:number[],output:number}[] = [
        {input:[2, 1, 3, 5, 3, 2],output:3},
       {input:[1,2,3,4],output:-1},
       {input:[5,1,5,1],output:5},
    ];

    it.each(inputs)('given %p expects %p',(params)=>{
        expect(findFirstRepeatedE(params.input)).toBe(params.output)
    })
});

describe('unit tests',()=>{
    it('should return the repeated number',()=>{
        expect(findFirstRepeatedE([2,3,4,2])).toBe(2);
    });

    it('should return -1 if there are no repeated number',()=>{
        expect(findFirstRepeatedE([2,3,4,1])).toBe(-1);
    });
})
