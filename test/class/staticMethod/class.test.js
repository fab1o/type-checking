import Class from './class';

describe('Class method', () => {
    it('throw an error', () => {
        expect(() => {
            Class.method({
                code: null
            });
        }).toThrow(
            'MyClass.method({code, isActive}) options.code expected a Number but received null.'
        );
    });
});
