import { Types, typecheck } from '../../../../src';

export default class Parent {
    method() {
        const params = {
            options: Types.object({
                name: Types.string
            })
        };

        typecheck(this, this.method, params, arguments);
    }

    toString() {
        return 'Parent';
    }
}
