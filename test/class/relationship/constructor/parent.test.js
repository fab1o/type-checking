import Parent from './parent';

const errorMessage = 'Parent(name) name expected a String but received undefined.';

describe('child', () => {
    it(errorMessage, () => {
        try {
            new Parent();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
