import { Config } from '../config';

/**
 * @desc Parameter of a method or function or a property of a stand-alone object.
 */
export class Param {
    /**
     *
     * @param {Object} options
     * @param {String} options.name - Parameter name.
     * @param {TypeChecking.MessageBuilder.Param} [options.parent=null] - Parent param.
     * @param {Boolean} [options.isNullable=false] - Whether param accepts null.
     * @param {Boolean} [options.isOptional=false] - Whether should include brackets or not [ ].
     * @param {Boolean} [options.isUndefinable=false] - Whether should include brackets or not [ ].
     * @param {String} [options.typeName=null] - Type name defined in the optionablevalidateCreator.
     *
     */
    constructor(options) {
        const {
            name,
            parent = null,
            isNullable = false,
            isOptional = false,
            isUndefinable = false,
            typeName = null
        } = options;

        this.name = name;
        this.parent = parent;
        this.isNullable = isNullable;
        this.isOptional = isOptional;
        this.isUndefinable = isUndefinable;
        this.typeName = typeName;

        /**
         * @type {TypeChecking.MessageBuilder.Params|null}
         */
        this.params = null;
    }

    /**
     * @desc Returns whether param is required or not.
     * @returns {Boolean}
     */
    get isRequired() {
        return this.isOptional === false && this.isUndefinable === false;
    }

    /**
     * @desc Returns whether param is non-required or not.
     * @returns {Boolean}
     */
    get isNonRequired() {
        return this.isOptional || this.isUndefinable;
    }

    /**
     * @desc Returns what other values the param accepts. `Config.displayParamExt` must be set to true.
     * @returns {String}
     */
    get extension() {
        if (Config.displayParamExt === false) {
            return '';
        }

        if (this.isOptional) {
            return ' or null or undefined';
        }

        if (this.isNullable) {
            return ' or null';
        }

        if (this.isUndefinable) {
            return ' or undefined';
        }

        return '';
    }

    toString() {
        const par = Config.parentsOn && this.parent != null ? `${this.parent.name}.` : '';

        return `${par}${this.name}`;
    }
}
