export const getStartOfDateSeconds = (date: Date) => {
  return getStartOfDate(date).getTime().toString();
}

export const getStartOfDate = (date: Date) => {
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

const day = 60 * 60 * 24 * 1000;

export const changeDate = (date: Date, changeBy: number) => {
  return new Date(date.getTime() + (day * changeBy));
}