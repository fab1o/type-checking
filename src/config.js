import Check from 'check-types';

const DEFAULT_ETCETERA = true;
const DEFAULT_PARENTS = true;
const DEFAULT_OPTIONAL_BRACKETS = true;
const DEFAULT_EXPECTED_MSG = 'expected';
const DEFAULT_RECEIVED_MSG = 'but received';
const DEFAULT_WITH_PROPS_MSG = 'with properties';
const DEFAULT_ERROR_TYPE = SyntaxError;

export class Config {
    // private props
    static #etceteraOn = DEFAULT_ETCETERA;

    static #parentsOn = DEFAULT_PARENTS;

    static #optionalBracketsOn = DEFAULT_OPTIONAL_BRACKETS;

    static #expectedMessage = DEFAULT_EXPECTED_MSG;

    static #receivedMessage = DEFAULT_RECEIVED_MSG;

    static #withPropsMessage = DEFAULT_WITH_PROPS_MSG;

    static #errorType = DEFAULT_ERROR_TYPE;

    /**
     *
     * @desc The "an Array of..." message part.
     * @returns {String}
     *
     */
    static get arrayOfMessage() {
        return 'an Array of ';
    }

    /**
     *
     * @desc The ", ... " part in the parameters list.
     * @returns {Boolean}
     *
     */
    static get etceteraOn() {
        return Config.#etceteraOn;
    }

    static set etceteraOn(value) {
        if (Check.boolean(value)) {
            Config.#etceteraOn = value;
        }
    }

    /**
     *
     * @desc Whether the param's parent name is in the errorType message.
     * @returns {Boolean}
     *
     */
    static get parentsOn() {
        return Config.#parentsOn;
    }

    static set parentsOn(value) {
        if (Check.boolean(value)) {
            Config.#parentsOn = value;
        }
    }

    /**
     *
     * @desc Whether message includes square brackets for optional params.
     * @returns {Boolean}
     *
     */
    static get optionalBracketsOn() {
        return Config.#optionalBracketsOn;
    }

    static set optionalBracketsOn(value) {
        if (Check.boolean(value)) {
            Config.#optionalBracketsOn = value;
        }
    }

    /**
     *
     * @desc The "expected..." message part.
     * @returns {String}
     *
     */
    static get expectedMessage() {
        return Config.#expectedMessage;
    }

    static set expectedMessage(value) {
        if (Check.string(value)) {
            Config.#expectedMessage = value;
        }
    }

    /**
     *
     * @desc The "but received..." message part.
     * @returns {String}
     *
     */
    static get receivedMessage() {
        return Config.#receivedMessage;
    }

    static set receivedMessage(value) {
        if (Check.string(value)) {
            Config.#receivedMessage = value;
        }
    }

    /**
     *
     * @desc The "with properties..." message part.
     * @returns {String}
     *
     */
    static get withPropsMessage() {
        return Config.#withPropsMessage;
    }

    static set withPropsMessage(value) {
        if (Check.string(value)) {
            Config.#withPropsMessage = value;
        }
    }

    /**
     *
     * @desc The Default Error type.
     * @returns {Error}
     *
     */
    static get DefaultError() {
        return DEFAULT_ERROR_TYPE;
    }

    /**
     *
     * @desc The Error type to throw.
     * @returns {Error}
     *
     */
    static get Error() {
        return Config.#errorType;
    }

    static set Error(value) {
        if (Check.instanceStrict(value.prototype, Error)) {
            Config.#errorType = value;
        }
    }

    /**
     *
     * @param {Object} [options]
     * @param {Error} [options.errorType=SyntaxError] The Error to throw by a bad typecheck.
     * @param {Boolean} [options.etcetera=true] If message includes "...".
     * @param {Boolean} [options.parents=true] If message includes the param's parent name.
     * @param {Boolean} [options.optionalBracketsOn=true] If message includes square brackets for optional params.
     * @param {String} [options.expectedMessage='expected'] The "expected..." message part.
     * @param {String} [options.receivedMessage='but received'] The "but received..." message part.
     * @param {String} [options.withPropsMessage='with properties'] The "with properties..." message part.
     * @desc Setup config.
     *
     */
    static setup(options = {}) {
        if (Check.not.object(options)) {
            return;
        }

        if (Check.assigned(options.errorType)) {
            Config.Error = options.errorType;
        }

        if (Check.assigned(options.etceteraOn)) {
            Config.etceteraOn = options.etceteraOn;
        }

        if (Check.assigned(options.parentsOn)) {
            Config.parentsOn = options.parentsOn;
        }

        if (Check.assigned(options.optionalBracketsOn)) {
            Config.optionalBracketsOn = options.optionalBracketsOn;
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
    }

    /**
     *
     * @desc Resets all config to factory default.
     *
     */
    static reset() {
        Config.#etceteraOn = DEFAULT_ETCETERA;
        Config.#parentsOn = DEFAULT_PARENTS;
        Config.#optionalBracketsOn = DEFAULT_OPTIONAL_BRACKETS;

        Config.#expectedMessage = DEFAULT_EXPECTED_MSG;
        Config.#receivedMessage = DEFAULT_RECEIVED_MSG;
        Config.#withPropsMessage = DEFAULT_WITH_PROPS_MSG;

        Config.resetErrorType();
    }

    /**
     *
     * @desc Resets all config to factory default.
     *
     */
    static resetErrorType() {
        Config.#errorType = DEFAULT_ERROR_TYPE;
    }
}
