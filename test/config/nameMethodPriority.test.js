import { Config, Types, typecheck } from '../../src';

describe.skip('Config.nameMethodPriority', () => {
    class Student {
        static get name() {
            return 'StudentName';
        }

        toString() {
            return 'StudentToString';
        }

        constructor() {
            const params = {
                arg: Types.string
            };

            typecheck(this, params, arguments);
        }

        static method() {
            const params = {
                arg: Types.string
            };

            typecheck(this, 'myMethod', params, arguments);
        }
    }

    afterAll(() => {
        Config.reset();
    });

    it('should work with NameMethod.name', () => {
        expect(() => {
            Config.nameMethodPriority = Config.NameMethod.name;

            new Student();
        }).toThrow('StudentName(arg) arg expected a String but received undefined.');
    });

    it('should work with NameMethod.toString', () => {
        expect(() => {
            Config.nameMethodPriority = Config.NameMethod.toString;

            new Student();
        }).toThrow('StudentToString(arg) arg expected a String but received undefined.');
    });

    it('should work with reset', () => {
        expect(() => {
            Config.reset();

            new Student();
        }).toThrow('StudentName(arg) arg expected a String but received undefined.');
    });

    it('should work with custom name', () => {
        expect(() => {
            Student.method();
        }).toThrow('StudentName.myMethod(arg) arg expected a String but received undefined.');
    });
});
