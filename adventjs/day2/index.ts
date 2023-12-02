function manufacture(gifts:string[], materials:string) {
    // Code here
    return gifts.filter(gift=>{
        return gift.split('').every(letter=>materials.includes(letter))
    })

}

export default manufacture;
