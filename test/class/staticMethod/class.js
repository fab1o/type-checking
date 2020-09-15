import { Types, typecheck } from '../../../src';

export default class Class {
    static method() {
        const params = {
            options: Types.object({
                name: Types.string,
                code: Types.number,
                isActive: Types.boolean
            })
        };

        typecheck(Class, Class.method, params, arguments);
    }

    toString() {
        return 'Class';
    }
}
