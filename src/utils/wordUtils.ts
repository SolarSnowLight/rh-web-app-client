



const objectsPlural = (cnt: number) => {
    if (cnt%100>=11 && cnt%100<=19) return 'объектов'
    if (cnt%10===1) return 'объект'
    if (cnt%10>=2 && cnt%10<=4) return 'объекта'
    if (cnt%10===0 || cnt%10>=5 && cnt%10<=9) return 'объектов'
    return 'объектов'
}



export const wordUtils = {
    objectsPlural,
}