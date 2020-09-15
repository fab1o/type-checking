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
            switch (value.constructor.name) {
                case 'Array':
                case 'Object':
                    return 'an ';
                default:
                    return 'a ';
            }
        default:
            return '';
    }
}
