import Parent from './parent';

const errorMessage = 'Parent.method({ name }) options.name expected a String but received null.';

describe('parent method', () => {
    it(errorMessage, () => {
        try {
            const parent = new Parent();

            parent.method({
                name: null
            });

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
