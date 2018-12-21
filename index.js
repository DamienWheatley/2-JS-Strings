const moment = require('moment');

let date = '29/07/1954';
console.log(date);


function convertDateFormat(date){
    let dates = [];
    let splitDatesArray = date.split('/'||'-');

    splitDatesArray.forEach(splitDates => {
        let splitDate = splitDates.split(",");
        dates.push(splitDate);
    })
    
    let day = dates[0];
    let month = dates[1];
    let year = dates[2];

    let mmDDyyy = month + '/' + day + '/' + year;

    return mmDDyyy;
}



convertDateFormat(date);