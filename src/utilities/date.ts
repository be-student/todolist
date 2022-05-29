export const inThreeDay = (date: Date) => {
  const now: Date = new Date();
  return date.valueOf() - now.valueOf() < 1000 * 60 * 60 * 24 * 3;
};
