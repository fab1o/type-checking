import { Types, typecheck } from '../../src';

class Student {}

describe('Types.instanceScrict', () => {
    it('type name to be correct', () => {
        expect(Types.instanceStrict().typeName).toBe('instanceStrict');
    });

    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    student: Types.instanceStrict(Student)
                },
                []
            );
        }).toThrow(
            '{student} student expected an instance of Student but received undefined.'
        );
    });

    it('expect to not throw an Error', () => {
        expect(() => {
            typecheck(
                {
                    date: Types.instanceStrict(Date)
                },
                [new Date()]
            );
        }).not.toThrow();
    });

    it.skip('no error is thrown when value is {}.', () => {
        expect(() => {
            typecheck(
                {
                    obj: Types.instanceStrict(Number).or.object()
                },
                [{}]
            );
        }).not.toThrow();
    });
});
