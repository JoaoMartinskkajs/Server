
interface SequenceType{
    color: string
}

export const handleResultSignal = (message: string) => {
    const GreenCondition = message?.includes("GREEN");
    const RedCondition = message?.includes("RED");


    function formatSequence(){
        const msg = message?.split("\n")

        const blackHole = "\u26AB";
        const whiteHole = "\u26AA"
        const redHole = "\uD83D\uDD34";

        const formater = msg[1].replace(blackHole, "black").replace(redHole, "red")
        .replace(whiteHole, "white").replace(" ", "").replace("(", "").replace(")", "")?.replace(" ", "")
        ?.replace(blackHole, "black")?.replace(redHole, "red")
        ?.replace(whiteHole, "white")?.replace("🔴", "red")?.replace("⚫️","black").replace("⚪️","white")
        ;

        const separator = formater.split("|");

        const sequence: Array<SequenceType> = [];
        separator.map(signal => {
            sequence.push({color: signal})
        });

        return sequence;

    };

    if(GreenCondition){
        return {
            result: "Green",
            sequence: formatSequence()
        }
    }
    
    if(RedCondition){
        return {
            result: "Red",
            sequence: formatSequence()
        }
    }
}