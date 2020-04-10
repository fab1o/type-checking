import Child from './child';

const errorMessage =
    'Child.method({ code, isActive, ... }) options.code expected a Number but received undefined.';

describe('child method', () => {
    it(errorMessage, () => {
        try {
            const child = new Child();

            child.method({
                name: 'Fabio'
            });

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
