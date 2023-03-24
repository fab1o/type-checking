import { Check, Types, typecheck } from '../../index';

Check.object({});

const Enum = { a: 'a' };

class AccountManager {
    constructor(...args) {
        const params = {
            arr1: Types.array,
            arr2: Types.array.of.nonEmptyString,
            assign: Types.assigned.warn,
            name: Types.string,
            code: Types.in({}),
            obj: Types.object(),
            obj2: Types.nonEmptyObject,
            str: Types.string.optional.warn,
            enum: Types.in(Enum),
            // enum: Types.in(Enum).or.nonEmptyString,
            skip: Types.skip.warn,
            // num: Types.integer.and.positive,
            num: Types.integer,
            // nil: Types.null.log,
            // o: Types.instanceStrict(Object).or.object({}),
            o: Types.instanceStrict(Object),
            // buffer: Types.arrayBufferView.or.nonEmptyString,
            buffer: Types.arrayBufferView,
            custom: Types.custom(() => true),
            custom2: Types.custom(() => true, ''),
            custom3: Types.custom(() => true, '', 1, 2).warn
        };

        typecheck(this, params, args);

        typecheck(this, params, args, Error);

        typecheck(this, params, {});

        typecheck(params, args, Error);
    }
}

class Account {
    constructor(options) {
        const params = {
            options: Types.object({
                manager: Types.instanceStrict(AccountManager)
            })
        };

        typecheck.atLeastOne(this, params, arguments);

        typecheck.atLeastOne(this, params, arguments, TypeError);

        typecheck.atLeastOne(this, params, {});

        typecheck.warn(this, arguments);

        typecheck.warn(this, arguments, SyntaxError);
    }

    method() {
        const params = {
            x: Types.array.of.date,
            // e: Types.even,
            y: Types.dateString,
            z: Types.number.optional,
            f: Types.inheritance(Account)
        };

        typecheck(this, this.method, params, arguments);

        typecheck(this, this.method, params, {});

        typecheck.warn(this, this.method, params, arguments);
    }
}
