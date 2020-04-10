import { Types, typecheck } from '../../../../src';

export default class Parent {
    constructor(name) {
        const params = {
            name: Types.string
        };

        typecheck(this, params, arguments);
    }

    toString() {
        return 'Parent';
    }
}
