import { DoubleController } from "../controllers/History/DoubleController"

interface Info{
    enter: string,
    after: string,
};

interface Sequence{
    color: string
}

interface Result{
    result: string,
    sequence: Array<Sequence>
}


export const saveHistoryDouble = async ( info: Info , result: Result ) => {
    try{
        await new DoubleController().insertInHistory({
            enter: info.enter,
            after: info.after,
            result
        });
    }

    catch(err){
        throw new Error("Error")
        console.log(err)
    }
};