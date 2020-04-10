import { Types, typecheck } from '../../src';

class Student {}

const errorMessage = '{student} student expected an instance of Student but received undefined.';

describe('Types.instanceScrict', () => {
    it(errorMessage, () => {
        try {
            typecheck(
                {
                    student: Types.instanceStrict(Student)
                },
                []
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
