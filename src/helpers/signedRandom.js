
/**
 *
 * Returns a number between a min and a max
 * @param {Number} min
 * @param {Number} max
 * @returns
 */
const signedRandom = (min, max) => {
  return min + Math.random() * (max - min);
}

export default signedRandom;