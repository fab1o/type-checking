import { Types, typecheck } from '../../../../src';

import Parent from './parent';

export default class Child extends Parent {
    constructor(name, code, isActive) {
        super(name);

        const params = {
            name: Types.string,
            code: Types.number,
            isActive: Types.boolean
        };

        typecheck(this, params, arguments);
    }

    toString() {
        return 'Child';
    }
}
