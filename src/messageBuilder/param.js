import Check from 'check-types';

import { Config } from '../config';

/**
 *
 * @class TypeChecking.MessageBuilder.Param
 *
 */
export class Param {
    /**
     *
     * @param {Object} options
     * @param {String} options.name Parameter name.
     * @param {TypeChecking.MessageBuilder.Param} [options.parent=null] Parent param.
     * @param {Boolean} [options.isNullable=false] Whether param accepts null.
     * @param {Boolean} [options.isOptional=false] Whether should include brackets or not [ ].
     * @param {String} [options.type=null] Type name defined in the optionableTypeCreator.
     * @param {Number} [options.index=null] Position in the params list.
     *
     */
    constructor(options) {
        const {
            name,
            parent = null,
            isNullable = false,
            isOptional = false,
            type = null,
            index = null
        } = options;

        this.name = name;
        this.parent = parent;
        this.optional = isOptional;
        this.type = type;
        this.index = index;
        this.nullable = isNullable;
    }

    /**
     *
     * @param {Object<TypeChecking.Type>} [params={}] Params built with Types.
     * @param {TypeChecking.MessageBuilder.Param} [parent=null] Parent in case of param of param.
     * @desc Converts params built with Types to params built with Param.
     * @returns {Array<TypeChecking.MessageBuilder.Param>} Array of params.
     *
     */
    static parse(params = {}, parent = null) {
        if (params === null) {
            return [];
        }

        return Object.keys(params).map((name, i) => {
            const paramValidate = params[name];
            const isOptional = Check.not.assigned(paramValidate.optional);
            const { type } = paramValidate;
            const index = parent != null ? i + 10 * parent.index : i;

            return new Param({
                name,
                parent,
                isOptional,
                type,
                index
            });
        });
    }

    toString() {
        const openBracket = Config.optionalBracketsOn && this.optional ? '[' : '';
        const closBracket = Config.optionalBracketsOn && this.optional ? ']' : '';

        if (Config.parentsOn && this.parent != null) {
            return `${openBracket}${this.parent.name}.${this.name}${closBracket}`;
        }

        return `${openBracket}${this.name}${closBracket}`;
    }
}
