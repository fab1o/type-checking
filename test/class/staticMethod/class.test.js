import Class from './class';

const errorMessage =
    'Class.method({ name, code, isActive }) options.name expected a String but received null.';

describe('class method', () => {
    it(errorMessage, () => {
        try {
            Class.method({
                name: null
            });

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
