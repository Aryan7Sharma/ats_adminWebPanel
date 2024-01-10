import moment from 'moment-timezone';

const months = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec",];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const dateToDayName = (dateString) => {
    let d = new Date(dateString);
    let dayName = days[d.getDay()];
    return dayName;
};

export const dateToDayMonthName = (dateString) => {
    let d = new Date(dateString);
    let month = d.getMonth();
    let day = d.getDate();
    let dayMonth = day.toString() + "-" + months[month];
    return dayMonth;
};

export const convertToIndianTime = (timeInUtc) => {
    const indianTimeFormat = moment(timeInUtc, 'hh:mm A').tz('Asia/Kolkata').format('hh:mm A');
    //console.log("timeIndianFormat", indianTimeFormat, timeInUtc);
    return indianTimeFormat;
};

export const convertToIndianTime2 = (time) => {
    const formatedTime = time.split(',')[0]
    const utcDateTime = new Date(formatedTime);
    const loacalTime = utcDateTime.toLocaleString([], {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    return loacalTime;
};

export const validateEmployeeCheckIn = (checkInTime) => {
    const timeSplitArray = checkInTime.split(" ");
    const timeFormat = timeSplitArray[timeSplitArray.length - 1]
    if (timeFormat === "pm") {
        return false
    }
    const getHour = timeSplitArray[0].split(":")[0]
    const getMinute = timeSplitArray[0].split(":")[1]
    if (parseInt(getHour) > 9 && parseInt(getMinute) > 0) {
        return false
    }
    return true;
};

export const validateEmployeeCheckOut = (checkInTime) => {
    const timeSplitArray = checkInTime.split(" ");
    const timeFormat = timeSplitArray[timeSplitArray.length - 1]
    if (timeFormat === "am") {
        return false
    }
    const getHour = timeSplitArray[0].split(":")[0]
    const getMinute = timeSplitArray[0].split(":")[1]
    if (parseInt(getHour) < 7) {
        return false
    }
    return true;
};

export const getDateTimeDifferenceInMinutes = (date1, date2) => {
    if (date1 == null || date1 === "NA" || date2 == null || date2 === "NA") {
        return 0;
    }
    const formatedDate1 = new Date(date1);
    const formatedDate2 = new Date(date2);
    const diffInMs = Math.abs(formatedDate2 - formatedDate1);
    return parseInt(diffInMs / (1000 * 60));
}

export const convertMinutesInHM = (totalMinutes) => {
    if (totalMinutes == 0) {
        return 0
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours + "H:" + minutes + "M"
}