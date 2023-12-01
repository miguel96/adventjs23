import {recoverCalibrator} from "./index";

describe('tests',()=>{
    it('given 1abc2 should return 12',()=>{
        expect(recoverCalibrator('1abc2')).toBe('12')
    });

    it('given pqr3stu8vwx should return 38',()=>{
        expect(recoverCalibrator('pqr3stu8vwx')).toBe('38')
    });
    it('given a1b2c3d4e5f should return 15',()=>{
        expect(recoverCalibrator('a1b2c3d4e5f')).toBe('15')
    });
    it('given treb7uchet should return 77',()=>{
        expect(recoverCalibrator('treb7uchet')).toBe('77')
    });
})
