// ***
// import { Config } from '../config';

/**
 * @desc Parameter of a method or function or a property of a stand-alone object.
 */
export class Param {
    /**
     *
     * @param {Object} options
     * @param {String} options.name - Parameter name.
     * @param {TypeChecking.MessageBuilder.Param} [options.parent=null] - Parent of this param.
    //  * @param {Boolean} [options.isNullable=false] - If true, param accepts null.
     * @param {Boolean} [options.isOptional=false] - If true, param accepts null or undefined.
    //  * @param {Boolean} [options.isUndefinable=false] - If true, param accepts undefined.
     *
     */
    constructor(options) {
        const {
            name,
            parent = null,
            // isNullable = false, ***
            isOptional = false
            // , isUndefinable = false ***
        } = options;

        this.name = name;
        this.parent = parent;
        this.isOptional = isOptional;
        // ***
        // this.isNullable = isNullable;
        // this.isUndefinable = isUndefinable;

        this.isArray = false; // re-defined in MessageBuilder#setParentParams

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
        return this.isOptional === false; // && this.isUndefinable === false; ***
    }

    /**
     * @desc Returns whether param is non-required or not.
     * @returns {Boolean}
     */
    get isNonRequired() {
        return this.isOptional; // || this.isUndefinable; ***
    }

    /**
     * @desc Returns what other values the param accepts.
     * @returns {String}
     */
    get extension() {
        // ***
        // if (Config.displayParamExt === false) {
        //     return '';
        // }

        if (this.isOptional) {
            return ' or null or undefined';
        }

        // ***
        // if (this.isNullable) {
        //     return ' or null';
        // }
        //
        // if (this.isUndefinable) {
        //     return ' or undefined';
        // }

        return '';
    }

    toString() {
        // ***
        // const par = Config.parentsOn && this.parent != null ? `${this.parent.name}.` : '';
        const par = this.parent != null ? `${this.parent.name}.` : '';

        return `${par}${this.name}`;
    }
}
