import { Types, typecheck } from '../../src';

class Student {}

describe('Types.instanceScrict', () => {
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
});
