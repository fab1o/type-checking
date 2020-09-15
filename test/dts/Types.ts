import { Types, typecheck } from '../../index';

class AccountManager {
    constructor(...args) {
        const params = {
            name: Types.string,
            code: Types.in({}),
            obj: Types.object(),
            obj2: Types.nonEmptyObject
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
            z: Types.number.undefinable,
            f: Types.inheritance(Account)
        };

        typecheck(this, this.method, params, arguments);
    }
}
