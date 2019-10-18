
/**
 *
 * Returns a number between a min and a max
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} random number inbetween min and max
 */
export const signedRandom = (min, max) => {
  return min + Math.random() * (max - min);
}

/**
 * capitalises first letter of string
 * @param {String} string - to capitalise
 * @returns {String} capitalised string
 */
export const capitaliseFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
}