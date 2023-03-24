import { Types, typecheck } from '../../src';

export default class Client {
    constructor(name) {
        const params = {
            name: Types.string.optional
        };

        typecheck(this, params, arguments);
    }

    changeInfo(name, year) {
        const params = {
            name: Types.string,
            year: Types.number
        };

        typecheck(this, 'changeInfo', params, arguments);
        // or
        typecheck(this, this.changeInfo, params, arguments);
    }
}
