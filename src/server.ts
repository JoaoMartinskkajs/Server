import 'dotenv/config';
import { ConnectionDB } from './database/connectDatabase';

import express from 'express';
import { routes } from './routes';
import cors from 'cors';

import http from 'http';
import { Server } from 'socket.io';
import { formatSignal } from './utils/formatSignal';
import { handleResultSignal } from './utils/handleResultSignal';
import { saveHistoryDouble } from './utils/saveHistoryDouble';
import { getHour } from './utils/getHour';
import { deleteAllDouble } from './utils/deleteAllDoubleHistory';

const PORT = process.env.PORT as number | unknown;

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

export interface SingalBody{
    enter?: string,
    after?: string,
    protection?: string 
}

io.on('connection', (socket) => {
    let singalStatusCounter = 0;
    let signalBody: SingalBody = {};

    socket.on("signal", (data) => {
        getHour() == "00" && deleteAllDouble();


        const reset = () => {
            setTimeout(() => {
                if(singalStatusCounter == 1){
                    io.emit("Signal", "Signal canceled");
                    singalStatusCounter = 0
                }
            }, 50000)
        };

        const signalStatusAtention = data?.includes('Atenção, possível sinal');
        if(signalStatusAtention && singalStatusCounter == 0){

            singalStatusCounter++;

            io.emit("Signal", {atention: "Atention, confirmed signal", hour: getHour()})
            reset();
        };
    
        const signalStatusConfirmed = data?.includes('Sinal confirmado');
        if(signalStatusConfirmed && singalStatusCounter == 1){

            singalStatusCounter++;

            signalBody = formatSignal(data, "Entrar no:", "Após o:")!
            io.emit("Signal", {signal: signalBody, hour: getHour()});
        };
    
        const signalStatusResult = data?.includes("GREEN") || data.includes("RED");
        if(signalStatusResult && singalStatusCounter == 2){
            const result = handleResultSignal(data);

            try{
                saveHistoryDouble(
                    { 
                    enter: signalBody.enter!, 
                    after: signalBody.after! },
                    {
                        result: result?.result!,
                        sequence: result?.sequence!
                    }
                ).then(() => {
                    singalStatusCounter = 0;
                    io.emit("Signal", result)
                })
            }
            catch(err){
                console.log(err)
            }
        }

    })
});


ConnectionDB.then(() => {

    app.use(express.json());
    app.use(cors());
    app.use(routes);


    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} 👻`)
    });
});
