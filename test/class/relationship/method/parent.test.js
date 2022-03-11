import Parent from './parent';

describe('Parent method', () => {
    it('throw an error', () => {
        expect(() => {
            const parent = new Parent();

            parent.method({
                name: null
            });
        }).toThrow(
            'MyParent.method({name}) options.name expected a String but received null.'
        );
    });

    it('throw an error on expected', () => {
        expect(() => {
            const parent = new Parent();

            parent.expected(null);
        }).toThrow(
            'MyParent.expected(date) date expected an instance of Number but received null.'
        );
    });
});
