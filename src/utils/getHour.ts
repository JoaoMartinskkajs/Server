export function getHour(){
    const date = new Date();
    
    let hour: number | string = date.getHours();
    let minutes: number | string = date.getMinutes();

    function formatHour(){
        let format: number | string = 0
    
        if(hour == 2){
            format = 23
            return format
        }
        if(hour == 1){
            format = 22
            return format
        }
        if (hour == 0){
            format = 21
            return format
        }
        else{
            let test: number | string = Number(hour) - 3

            if(String(test).length == 1){
                test = '0' + test
            }

            format = test;
            return format
        }
    };

    function formatMinutes(){
        let format: string | number = 0;

        if(String(minutes).length == 1){
            format = "0" + minutes;

            return format
        }

        else{
            return minutes
        }
    };

    hour = formatHour();
    minutes = formatMinutes();

    const formatedHour = `${hour}:${minutes}`;

    return formatedHour
}