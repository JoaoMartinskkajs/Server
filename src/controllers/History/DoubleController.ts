import { Request, Response } from "express";
import Double from "../../database/entities/Double";
import { getHour } from "../../utils/getHour";

interface Sequence{
    color: string
}

interface Double{
    enter: string,
    after: string,
    result: {
        result: string,
        sequence: Array<Sequence>
    }
}

export class DoubleController{

    async insertInHistory( props: Double ){

        if(!props){
            throw new Error("Missing Fields")
            console.log("Missing Fields")
            return
        };

        const date = new Date();
        const day = date.getUTCDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formatedDate = `${day}/${month}/${year}`;

        try{
            await Double.create({
                enter: props.enter,
                after: props.after,
                result: props.result,
                hour: getHour(),
                date: formatedDate
            });

            return
        }

        catch(err){
            throw new Error("Error")
        }

        
    };

    async index( req: Request, res: Response ){
        const response = await Double.find();

        res.status(200).send(response);
    };
} 