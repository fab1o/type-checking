import Class from './class';

describe('Class method', () => {
    it('throw an error', () => {
        expect(() => {
            Class.method({
                name: null
            });
        }).toThrow(
            'Class.method({ name, code, isActive }) options.name expected a String but received null.'
        );
    });
});
