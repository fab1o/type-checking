/* eslint-disable no-underscore-dangle */
import Check from '@fab1o/check-types';

import { Logger } from './logger';

const DEFAULT_ERROR = TypeError;

// ***
// const DEFAULT_ETCETERA = true;
// const DEFAULT_PARENTS = true;
// const DEFAULT_DISPLAY_PARAM_EXT = true;
// const DEFAULT_EXPECTED_MSG = 'expected';
// const DEFAULT_RECEIVED_MSG = 'but received';
// const DEFAULT_NAME_METHOD_PRIORITY = 1;
// const DEFAULT_LOGGER_FUNC_FOR_OR_TYPE = 'warn';

/** local private variables */
let _errorType;
let _logger;

// ***
// let _etceteraOn;
// let _parentsOn;
// let _displayParamExt;
// let _expectedMessage;
// let _receivedMessage;
// let _nameMethodPriority;
// let _loggerMethodForOrType;

/**
 * @access public
 * @desc Configure TypeChecking.
 * @example
 * Config.setup({
 *   ErrorType: MyCustomError,
 *   logger: Logger
 * });
 */
class Config {
    /**
     * @desc The default Error type.
     * @returns {TypeError}
     */
    static get DefaultError() {
        return DEFAULT_ERROR;
    }

    /**
     * @desc The Error type to throw.
     * @returns {Error}
     */
    static get ErrorType() {
        return _errorType;
    }

    /**
     * @param {Error} value
     * @desc Sets the Error type to throw.
     */
    static set ErrorType(value) {
        if (Check.instance(value.prototype, Error)) {
            _errorType = value;
        } else {
            throw TypeError('Config.ErrorType expected a Type that inherits from Error.');
        }
    }

    /**
     * @desc The logger object.
     * @returns {Object}
     */
    static get logger() {
        return _logger;
    }

    /**
     * @param {Object} value
     * @desc Sets the logger object @see https://developer.mozilla.org/en-US/docs/Web/API/console
     */
    static set logger(value) {
        _logger = new Logger(value);
    }

    // ***
    // /**
    //  * @desc Enum for possible name methods.
    //  * @returns {Object}
    //  */
    // static get NameMethod() {
    //     return {
    //         name: 1,
    //         toString: 2
    //     };
    // }
    //
    // /**
    //  * @desc Enum for possible logger methods.
    //  * @returns {Object}
    //  */
    // static get LoggerMethod() {
    //     const obj = {};
    //
    //     Logger.methods.forEach((method) => {
    //         obj[method] = method;
    //     });
    //
    //     return obj;
    // }
    //
    // /**
    //  * @desc The ", ... " part in the parameters list.
    //  * @returns {Boolean}
    //  */
    // static get etceteraOn() {
    //     return _etceteraOn;
    // }
    //
    // /**
    //  * @param {Boolean} value
    //  * @desc Sets a flag to determine whether ", ... " part in the parameters list is displayed.
    //  */
    // static set etceteraOn(value) {
    //     if (Check.boolean(value)) {
    //         _etceteraOn = value;
    //     } else {
    //         throw TypeError(`Config.etceteraOn expected a Boolean but received: "${value}"`);
    //     }
    // }
    //
    // /**
    //  * @desc Whether the param's parent name is in the error message.
    //  * @returns {Boolean}
    //  */
    // static get parentsOn() {
    //     return _parentsOn;
    // }
    //
    // /**
    //  * @param {Boolean} value
    //  * @desc Sets a flag to determine whether the param's parent name is displayed in the error message.
    //  */
    // static set parentsOn(value) {
    //     if (Check.boolean(value)) {
    //         _parentsOn = value;
    //     } else {
    //         throw TypeError(`Config.parentsOn expected a Boolean but received: "${value}"`);
    //     }
    // }
    //
    // /**
    //  * @desc Whether message informs user it accepts null or undefined.
    //  * @returns {Boolean}
    //  */
    // static get displayParamExt() {
    //     return _displayParamExt;
    // }
    //
    // /**
    //  * @param {Boolean} value
    //  * @desc Sets a flag to determine whether message informs user it accepts null or undefined.
    //  */
    // static set displayParamExt(value) {
    //     if (Check.boolean(value)) {
    //         _displayParamExt = value;
    //     } else {
    //         throw TypeError(
    //             `Config.displayParamExt expected a Boolean but received: "${value}"`
    //         );
    //     }
    // }
    //
    // /**
    //  * @desc The "expected..." message part.
    //  * @returns {String}
    //  */
    // static get expectedMessage() {
    //     return _expectedMessage;
    // }
    //
    // /**
    //  * @param {String} value
    //  * @desc Sets the "expected..." message part.
    //  */
    // static set expectedMessage(value) {
    //     if (Check.string(value)) {
    //         _expectedMessage = value;
    //     } else {
    //         throw TypeError(
    //             `Config.expectedMessage expected a Boolean but received: "${value}"`
    //         );
    //     }
    // }
    //
    // /**
    //  * @desc The "but received..." message part.
    //  * @returns {String}
    //  */
    // static get receivedMessage() {
    //     return _receivedMessage;
    // }
    //
    // /**
    //  * @param {String} value
    //  * @desc Sets the "but received..." message part.
    //  */
    // static set receivedMessage(value) {
    //     if (Check.string(value)) {
    //         _receivedMessage = value;
    //     } else {
    //         throw TypeError(
    //             `Config.receivedMessage expected a String but received: "${value}"`
    //         );
    //     }
    // }
    //
    // /**
    //  * @desc The method used as a priority to get the type name for the error message.
    //  * @returns {String}
    //  */
    // static get nameMethodPriority() {
    //     return _nameMethodPriority;
    // }
    //
    // /**
    //  * @param {Config.NameMethod} value
    //  * @desc Sets the method used as a priority to get the type name for the error message.
    //  */
    // static set nameMethodPriority(value) {
    //     if (Check.in(value, Config.NameMethod)) {
    //         _nameMethodPriority = value;
    //     } else {
    //         throw TypeError(
    //             `Config.nameMethodPriority expected one of ${Config.NameMethod.join()} but received: "${value}"`
    //         );
    //     }
    // }
    //
    // /**
    //  * @access private
    //  * @desc The logger method used to log failures for the type.or.type.
    //  * @returns {String|null}
    //  */
    // static get loggerMethodForOrType() {
    //     return _loggerMethodForOrType;
    // }
    //
    // /**
    //  * @access private
    //  * @param {Config.LoggerMethod} value
    //  * @desc Sets the logger method used to log failures for the type.or.type. Use `null` to turn it off.
    //  */
    // static set loggerMethodForOrType(value) {
    //     if (value === null || Check.in(value, Config.LoggerMethod)) {
    //         _loggerMethodForOrType = value;
    //     } else {
    //         throw TypeError(
    //             `Config.loggerMethodForOrType expected one of ${Config.LoggerMethod.join()} or null but received: "${value}"`
    //         );
    //     }
    // }

    /**
     * @param {Object} [options]
     * @param {Error} [options.ErrorType=Config.DefaultError] - The Error to throw by a bad typecheck.
     * @param {Object} [options.logger=null] - The logger object @see https://developer.mozilla.org/en-US/docs/Web/API/console
    //  * @param {Boolean} [options.etcetera=true] - If message includes "...".
    //  * @param {Boolean} [options.parents=true] - If message includes the param's parent name.
    //  * @param {Boolean} [options.displayParamExt=true] - If message informs user it accepts null or undefined.
    //  * @param {String} [options.expectedMessage='expected'] - The "expected..." message part.
    //  * @param {String} [options.receivedMessage='but received'] - The "but received..." message part.
    //  * @param {Config.NameMethod} [options.nameMethodPriority=Config.NameMethod.name] - The method used as a priority to get the object name for the error message.
    //  * @param {Config.LoggerMethod|null} [options.loggerMethodForOrType=Config.LoggerMethod.warn] - The logger method used to log failures for the type.or.type. Use `null` to turn it off.
     * @desc Setup the config.
     */
    static setup(options = {}) {
        if (Check.not.object(options)) {
            return;
        }

        if (Check.assigned(options.ErrorType)) {
            Config.ErrorType = options.ErrorType;
        }

        if (Check.assigned(options.logger)) {
            Config.logger = options.logger;
        }

        // ***
        // if (Check.assigned(options.etceteraOn)) {
        //     Config.etceteraOn = options.etceteraOn;
        // }
        //
        // if (Check.assigned(options.parentsOn)) {
        //     Config.parentsOn = options.parentsOn;
        // }
        //
        // if (Check.assigned(options.displayParamExt)) {
        //     Config.displayParamExt = options.displayParamExt;
        // }
        //
        // if (Check.assigned(options.expectedMessage)) {
        //     Config.expectedMessage = options.expectedMessage;
        // }
        //
        // if (Check.assigned(options.receivedMessage)) {
        //     Config.receivedMessage = options.receivedMessage;
        // }
        //
        // if (Check.assigned(options.nameMethodPriority)) {
        //     Config.nameMethodPriority = options.nameMethodPriority;
        // }
        //
        // if (
        //     Check.assigned(options.loggerMethodForOrType) ||
        //     Check.null(options.loggerMethodForOrType)
        // ) {
        //     Config.loggerMethodForOrType = options.loggerMethodForOrType;
        // }
    }

    /**
     * @desc Resets all config to default.
     */
    static reset() {
        // ***
        // Config.etceteraOn = DEFAULT_ETCETERA;
        // Config.parentsOn = DEFAULT_PARENTS;
        // Config.displayParamExt = DEFAULT_DISPLAY_PARAM_EXT;
        //
        // Config.expectedMessage = DEFAULT_EXPECTED_MSG;
        // Config.receivedMessage = DEFAULT_RECEIVED_MSG;
        //
        // Config.nameMethodPriority = DEFAULT_NAME_METHOD_PRIORITY;
        //
        // Config.loggerMethodForOrType = DEFAULT_LOGGER_FUNC_FOR_OR_TYPE;

        Config.resetErrorType();
        Config.resetLogger();
    }

    /**
     * @desc Resets the ErrorType config to default.
     */
    static resetErrorType() {
        Config.ErrorType = DEFAULT_ERROR;
    }

    /**
     * @desc Resets the logger config to default.
     */
    static resetLogger() {
        Config.logger = console;
    }
}

Config.reset();

export { Config };
