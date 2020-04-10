import Child from './child';

const errorMessage = 'Child(name, code, isActive) code expected a Number but received undefined.';

describe('child', () => {
    it(errorMessage, () => {
        try {
            new Child('Fabio');

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
