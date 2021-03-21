const sumHourToDate = (date, hours) => {
    return date.setTime(
        date.getTime() + (hours * 60 * 60 * 1000)
    );
}

module.exports = {
    sumHourToDate
}