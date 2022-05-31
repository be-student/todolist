export const inThreeDay = (date: number) => {
  const now: number = new Date().valueOf();
  return date - now < 1000 * 60 * 60 * 24 * 3;
};
