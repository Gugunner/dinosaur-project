/**
 *
 * @param words
 * @returns {boolean}
 */
const onlyAlphabetic = (words) => {
    const alphabeticRegex = /(^[a-zA-Z]).+$/gi;
    return alphabeticRegex.test(words);
};
/**
 *
 * @param words
 * @returns {boolean}
 */
const checkEmptyField = (words) => {
    console.log("Words", words);
    return words.length === 0 || words === '';
};
/**
 *
 * @param {String} words
 * @param {number} minLength
 * @returns {boolean}
 */
const stringHasCertainMinimumLength = (words, minLength) => {
    return words.length >= minLength;
};
/**
 *
 * @param {String} number
 * @returns {boolean}
 */
const hasPositiveValue = (value) => {
    console.log("Value", value);
    return +value > 0;
};