import { Types, typecheck } from '../../index';

const Enum = { a: 'a' };

class AccountManager {
    constructor(...args) {
        const params = {
            arr1: Types.array,
            assign: Types.assigned.info,
            name: Types.string,
            code: Types.in({}),
            obj: Types.object(),
            obj2: Types.nonEmptyObject,
            str: Types.string.optional.log,
            enum: Types.in(Enum).or.nonEmptyString,
            skip: Types.skip.log,
            num: Types.integer.and.positive,
            nil: Types.null.log,
            o: Types.instanceStrict(Object).or.object({}),
            buffer: Types.arrayBufferView.or.nonEmptyString,
            custom: Types.custom(() => true).warn
        };

        typecheck(this, params, args);
    }
}

class Account {
    constructor(options) {
        const params = {
            optins: Types.object({
                manager: Types.instanceStrict(AccountManager)
            })
        };

        typecheck.atLeastOne(this, params, arguments);
    }

    method() {
        const params = {
            x: Types.array.of.date,
            y: Types.even,
            z: Types.number.optional,
            f: Types.inheritance(Account)
        };

        typecheck(this, this.method, params, arguments);
    }
}
