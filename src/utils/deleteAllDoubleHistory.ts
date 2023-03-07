import Double from "../database/entities/Double"

export const deleteAllDouble = async () => {
    try{
        await Double.deleteMany({});
    }
    catch(err){
        console.log(err)
    }
}