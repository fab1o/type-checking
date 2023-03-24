import { Types, typecheck } from '../../../../src';

import Parent from './parent';

export default class Child extends Parent {
    constructor(options) {
        super(options);

        const params = {
            options: Types.object({
                code: Types.number,
                isActive: Types.boolean
            })
        };

        typecheck(this, params, arguments);
    }

    // override method
    method(options) {
        super.method(options);

        const params = {
            options: Types.object({
                code: Types.number,
                isActive: Types.boolean
            })
        };

        typecheck(this, this.method, params, arguments);
    }

    // do not override method
    childMethod(code) {
        const params = {
            code: Types.number
        };

        typecheck(this, this.childMethod, params, arguments);
    }

    expected(options) {
        const params = {
            options: Types.object({
                parent: Types.instanceStrict(Parent)
            })
        };

        typecheck(this, this.expected, params, arguments);
    }

    toString() {
        return 'MyChild';
    }
}
