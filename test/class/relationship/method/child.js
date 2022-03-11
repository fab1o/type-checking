import { Types, typecheck } from '../../../../src';

import Parent from './parent';

export default class Child extends Parent {
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

    expected() {
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
