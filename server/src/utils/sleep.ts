/**
 * Sleeps the process N number of milliseconds.
 * @param {Number} ms The number of milliseconds to sleep.
 */
export default (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
