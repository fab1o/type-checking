import { Types, typecheck } from '../../../../src';

export default class Parent {
    constructor() {
        const params = {
            name: Types.string
        };

        typecheck(this, params, arguments);
    }

    toString() {
        return 'Parent';
    }
}
