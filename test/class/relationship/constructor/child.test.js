import Child from './child';

describe('Child', () => {
    it('throw an error', () => {
        expect(() => {
            new Child('Fabio');
        }).toThrow(
            'MyChild(name, code, isActive) code expected a Number but received undefined.'
        );
    });
});
