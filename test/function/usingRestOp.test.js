import { Types, typecheck } from '../../src';

function createStudent(...args) {
    const params = {
        name: Types.string
    };

    typecheck(createStudent, params, args);
}

describe('function using rest parameter as argument for input', () => {
    it('throw an error', () => {
        expect(() => {
            createStudent();
        }).toThrow('createStudent(name) name expected a String but received undefined.');
    });

    it('an Error is not thrown when passing correct data.', () => {
        expect(() => {
            createStudent('Fabio');
        }).not.toThrow();
    });
});
