import Child from './child';

describe('Child method', () => {
    it('throw an error', () => {
        expect(() => {
            const child = new Child();

            child.method({
                name: 'Fabio'
            });
        }).toThrow(
            'MyChild.method({code, isActive, ...}) options.code expected a Number but received undefined.'
        );
    });
    it('throw an error on expected', () => {
        expect(() => {
            const child = new Child();

            child.expected({
                parent: null
            });
        }).toThrow(
            'MyChild.expected({parent, ...}) options.parent expected an instance of MyParent but received null.'
        );
    });
});
