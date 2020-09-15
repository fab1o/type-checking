import Parent from './parent';

describe('Parent method', () => {
    it('throw an error', () => {
        expect(() => {
            const parent = new Parent();

            parent.method({
                name: null
            });
        }).toThrow(
            'Parent.method({ name }) options.name expected a String but received null.'
        );
    });
});
