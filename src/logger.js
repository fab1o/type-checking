import Check from '@fab1o/check-types';

/* eslint-disable no-console */

/**
 * @desc Serves as the Default Logger.
 */
export class Logger {
    // all possible logger methods
    static methods = ['warn']; // ['log', 'info', 'warn', 'error'];

    constructor(logger) {
        const log = (method, ...args) => {
            if (Check.function(logger[method])) {
                logger[method](...args);
            } else {
                console[method](...args);
            }
        };

        Logger.methods.forEach((method) => {
            if (Check.not.assigned(logger) || Check.not.function(logger[method])) {
                console.warn(
                    `Provided logger is missing the expected "${method}" function, falling back to console.`
                );
            }

            this[method] = log.bind(null, method);
        });
    }
}
