import format from "date-fns/format";

export const secondsTimeStampNow = () => parseInt(format(new Date(), "X"));
