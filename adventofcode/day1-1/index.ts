export const recoverCalibrator = (input:string):string=>{
    const [,first] = /([0-9])/.exec(input)||[];
    const [,second] = /([0-9])/.exec(input.split('').reverse().join(''))||[];
    return `${first}${second}`
};

