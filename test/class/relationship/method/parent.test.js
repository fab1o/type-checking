import Parent from './parent';

describe('Parent method', () => {
    let parent;

    beforeEach(() => {
        parent = new Parent({
            name: 'Parent'
        });
    });

    it('throw an error on constructor where argument is invalid', () => {
        expect(() => {
            new Parent({
                name: null
            });
        }).toThrow('MyParent({name}) options.name expected a String but received null.');
    });

    it('throw an error on method', () => {
        expect(() => {
            parent.method({
                name: null
            });
        }).toThrow(
            'MyParent.method({name}) options.name expected a String but received null.'
        );
    });

    it('throw an error on expected', () => {
        expect(() => {
            parent.expected(null);
        }).toThrow(
            'MyParent.expected(date) date expected an instance of Number but received null.'
        );
    });
});
