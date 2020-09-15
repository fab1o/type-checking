import Child from './child';

describe('Child method', () => {
    it('throw an error', () => {
        expect(() => {
            const child = new Child();

            child.method({
                name: 'Fabio'
            });
        }).toThrow(
            'Child.method({ code, isActive, ... }) options.code expected a Number but received undefined.'
        );
    });
});
