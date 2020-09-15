/* eslint-disable no-underscore-dangle */
import Check from '@fab1o/check-types';

const DEFAULT_ETCETERA = true;
const DEFAULT_PARENTS = true;
const DEFAULT_DISPLAY_PARAM_EXT = true;

const DEFAULT_EXPECTED_MSG = 'expected';
const DEFAULT_RECEIVED_MSG = 'but received';
const DEFAULT_WITH_PROPS_MSG = 'with properties';

const DEFAULT_NAME_METHOD_PRIORITY = 'name';

let _etceteraOn = DEFAULT_ETCETERA;
let _parentsOn = DEFAULT_PARENTS;
let _displayParamExt = DEFAULT_DISPLAY_PARAM_EXT;
let _expectedMessage = DEFAULT_EXPECTED_MSG;
let _receivedMessage = DEFAULT_RECEIVED_MSG;
let _withPropsMessage = DEFAULT_WITH_PROPS_MSG;
let _nameMethodPriority = DEFAULT_NAME_METHOD_PRIORITY;
let _errorType = SyntaxError;

/**
 * @access public
 * @desc Configure TypeChecking.
 * @example
 * Config.setup({
 *   ErrorType: MyCustomError,
 *   parentsOn: false,
 *   nameMethodPriority: Config.NameMethod.toString
 * });
 */
export class Config {
    /**
     * @enum {String}
     * @desc Enum for possible name methods.
     * @returns {String}
     */
    static get NameMethod() {
        return {
            name: 'name',
            toString: 'toString'
        };
    }

    /**
     * @desc The "an Array of..." message part.
     * @returns {String}
     */
    static get arrayOfMessage() {
        return 'an Array of';
    }

    /**
     * @desc The ", ... " part in the parameters list.
     * @returns {Boolean}
     */
    static get etceteraOn() {
        return _etceteraOn;
    }

    static set etceteraOn(value) {
        if (Check.boolean(value)) {
            _etceteraOn = value;
        }
    }

    /**
     * @desc Whether the param's parent name is in the error message.
     * @returns {Boolean}
     */
    static get parentsOn() {
        return _parentsOn;
    }

    static set parentsOn(value) {
        if (Check.boolean(value)) {
            _parentsOn = value;
        }
    }

    /**
     * @desc Whether message informs user it accepts null or undefined.
     * @returns {Boolean}
     */
    static get displayParamExt() {
        return _displayParamExt;
    }

    static set displayParamExt(value) {
        if (Check.boolean(value)) {
            _displayParamExt = value;
        }
    }

    /**
     * @desc The "expected..." message part.
     * @returns {String}
     */
    static get expectedMessage() {
        return _expectedMessage;
    }

    static set expectedMessage(value) {
        if (Check.string(value)) {
            _expectedMessage = value;
        }
    }

    /**
     * @desc The "but received..." message part.
     * @returns {String}
     */
    static get receivedMessage() {
        return _receivedMessage;
    }

    static set receivedMessage(value) {
        if (Check.string(value)) {
            _receivedMessage = value;
        }
    }

    /**
     * @desc The method used as a priority to get the type name for the error message.
     * @returns {String}
     */
    static get nameMethodPriority() {
        return _nameMethodPriority;
    }

    static set nameMethodPriority(value) {
        if (Check.string(value)) {
            _nameMethodPriority = value;
        }
    }

    /**
     * @desc The "with properties..." message part.
     * @returns {String}
     */
    static get withPropsMessage() {
        return _withPropsMessage;
    }

    static set withPropsMessage(value) {
        if (Check.string(value)) {
            _withPropsMessage = value;
        }
    }

    /**
     * @desc The Error type to throw.
     * @returns {Error}
     */
    static get ErrorType() {
        return _errorType;
    }

    static set ErrorType(value) {
        if (Check.instanceStrict(value.prototype, Error)) {
            _errorType = value;
        }
    }

    /**
     * @param {Object} [options]
     * @param {Error} [options.ErrorType=SyntaxError] - The Error to throw by a bad typecheck.
     * @param {Boolean} [options.etcetera=true] - If message includes "...".
     * @param {Boolean} [options.parents=true] - If message includes the param's parent name.
     * @param {Boolean} [options.displayParamExt=true] - If message informs user it accepts null or undefined.
     * @param {String} [options.expectedMessage='expected'] - The "expected..." message part.
     * @param {String} [options.receivedMessage='but received'] - The "but received..." message part.
     * @param {String} [options.withPropsMessage='with properties'] - The "with properties..." message part.
     * @param {String} [options.nameMethodPriority=Config.NameMethod.name] - The method used as a priority to get the object name for the error message.
     * @desc Setup the config.
     */
    static setup(options = {}) {
        if (Check.not.object(options)) {
            return;
        }

        if (Check.assigned(options.ErrorType)) {
            Config.ErrorType = options.ErrorType;
        }

        if (Check.assigned(options.etceteraOn)) {
            Config.etceteraOn = options.etceteraOn;
        }

        if (Check.assigned(options.parentsOn)) {
            Config.parentsOn = options.parentsOn;
        }

        if (Check.assigned(options.displayParamExt)) {
            Config.displayParamExt = options.displayParamExt;
        }

        if (Check.assigned(options.expectedMessage)) {
            Config.expectedMessage = options.expectedMessage;
        }

        if (Check.assigned(options.receivedMessage)) {
            Config.receivedMessage = options.receivedMessage;
        }

        if (Check.assigned(options.withPropsMessage)) {
            Config.withPropsMessage = options.withPropsMessage;
        }

        if (Check.assigned(options.nameMethodPriority)) {
            Config.nameMethodPriority = options.nameMethodPriority;
        }
    }

    /**
     * @desc Resets all config to default.
     */
    static reset() {
        _etceteraOn = DEFAULT_ETCETERA;
        _parentsOn = DEFAULT_PARENTS;
        _displayParamExt = DEFAULT_DISPLAY_PARAM_EXT;

        _expectedMessage = DEFAULT_EXPECTED_MSG;
        _receivedMessage = DEFAULT_RECEIVED_MSG;
        _withPropsMessage = DEFAULT_WITH_PROPS_MSG;

        _nameMethodPriority = DEFAULT_NAME_METHOD_PRIORITY;

        Config.resetErrorType();
    }

    /**
     * @desc Resets the errorType config to default.
     */
    static resetErrorType() {
        _errorType = SyntaxError;
    }
}
