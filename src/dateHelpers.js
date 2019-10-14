import format from "date-fns/format";

export const secondsTimeStampNow = () => parseInt(format(new Date(), "X"));
export const dateTimeFileFormatted = date => format(date, "MM-DD-YYYY_hhmmss");
