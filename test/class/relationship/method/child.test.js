import Child from './child';

describe('Child method', () => {
    let child;

    beforeEach(() => {
        child = new Child({
            name: 'Child',
            code: 1,
            isActive: true
        });
    });

    it('throw an error on constructor where parent argument is invalid', () => {
        expect(() => {
            new Child({
                name: null
            });
        }).toThrow('MyChild({name, ...}) options.name expected a String but received null.');
    });

    it('throw an error on constructor where child argument is invalid', () => {
        expect(() => {
            new Child({
                name: 'Child',
                code: null
            });
        }).toThrow(
            'MyChild({code, isActive, ...}) options.code expected a Number but received null.'
        );
    });

    it('throw an error on method where parent argument is invalid', () => {
        expect(() => {
            child.method({
                name: null
            });
        }).toThrow(
            'MyChild.method({name}) options.name expected a String but received null.'
        );
    });

    it('throw an error on method where child argument is invalid', () => {
        expect(() => {
            child.method({
                name: 'Fabio'
            });
        }).toThrow(
            'MyChild.method({code, isActive}) options.code expected a Number but received undefined.'
        );
    });

    it('throw an error on child method that does not override parent', () => {
        expect(() => {
            child.childMethod(null);
        }).toThrow('MyChild.childMethod(code) code expected a Number but received null.');
    });

    it('throw an error on expected', () => {
        expect(() => {
            child.expected({
                parent: null
            });
        }).toThrow(
            'MyChild.expected({parent}) options.parent expected an instance of MyParent but received null.'
        );
    });
});
