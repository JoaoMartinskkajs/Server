import { SingalBody } from "../server";

export  const formatSignal = (message: string, enterKey: string, afterKey: string) => {

    const separator = message?.split('\n');
    const enter = separator[1];
    const after = separator[2];

    const blackHole = "\u26AB";
    const redHole = "\uD83D\uDD34";
    
    const enterFormated = enter?.split(enterKey)[1]?.replace(' ', '')?.replace(blackHole, '')?.replace(' ', '')?.replace(' ', '')?.replace(' ', '');
    const afterFormated = after?.split(afterKey)[1]?.replace(' ', '')?.replace(redHole, '')?.replace(' ', '')?.replace(' ', '')?.replace(' ', '');
    
    const signalBody: SingalBody = {
        enter: enterFormated,
        after: afterFormated,
        protection: "Branco"
    };
    
    return signalBody;

};