import { Types, typecheck } from '../../../../src';

export default class Parent {
    constructor(options) {
        const params = {
            options: Types.object({
                name: Types.string
            })
        };

        typecheck(this, params, arguments);
    }

    method(options) {
        const params = {
            options: Types.object({
                name: Types.string
            })
        };

        typecheck(this, this.method, params, arguments);
    }

    expected(date) {
        const params = {
            date: Types.instanceStrict(Number)
        };

        typecheck(this, this.expected, params, arguments);
    }

    toString() {
        return 'MyParent';
    }
}
