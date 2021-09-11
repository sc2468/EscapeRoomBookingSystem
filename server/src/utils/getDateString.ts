export const getStartOfDateSeconds = (date: Date) => {
  date.setUTCHours(0, 0, 0, 0);
  return date.getTime().toString();
}