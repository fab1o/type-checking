import Check from '@fab1o/check-types';

/**
 *
 * @param {Object} value An Object.
 * @returns {String} Gets the correct article for a given type of Object.
 */
function getArticleOfObject(value) {
    if (Check.not.function(value.constructor)) {
        return '';
    }

    const firstLetter = value.constructor.name.substr(0, 1).toLowerCase();

    switch (firstLetter) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
            return 'an ';
        default:
            return 'a ';
    }
}

/**
 *
 * @param {*} value Any value.
 * @returns {String} Gets the correct article for the given value.
 */
export function getArticle(value) {
    switch (typeof value) {
        case 'string':
        case 'number':
        case 'function':
        case 'boolean':
            return 'a ';
        case 'object':
            return getArticleOfObject(value);
        default:
            return '';
    }
}
