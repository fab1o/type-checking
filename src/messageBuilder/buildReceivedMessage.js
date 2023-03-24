// ***
// import { Config } from '../config';
import { getValueName } from '../util/getValueName';

/**
 * @param {*} value - Value to stringify.
 * @returns {String} The "but received..." part of the error message.
 */
export function buildReceivedMessage(value) {
    const valueName = getValueName(value, {
        includeTypeName: true
    });

    // ***
    // return `${Config.receivedMessage} ${valueName}`;
    return `but received ${valueName}`;
}
