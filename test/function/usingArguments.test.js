import { Types, typecheck } from '../../src';

function createStudent() {
    const params = {
        name: Types.string
    };

    typecheck(createStudent, params, arguments);
}
describe('function using JavaScript arguments as argument for input', () => {
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
