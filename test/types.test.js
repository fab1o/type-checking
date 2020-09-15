import { Types } from '../src';
import { Asserts } from '../src/types/asserts';

describe('Types', () => {
    const qtyAsserts = Object.keys(Asserts).length;

    let qtyValidatorsTested = 0;
    let qtyTypesTested = 0;

    function testAssert(typeName) {
        it('method has type', () => {
            expect(Asserts).toHaveProperty(typeName);
        });
    }

    function testValidator(typeName, validator) {
        it('validator is correctly set', () => {
            expect(validator).toBeInstanceOf(Function);
            expect(validator.typeName).toBe(typeName);
        });
        qtyValidatorsTested++;
    }

    function testNullable(typeName, validator) {
        it('nullable is correctly set', () => {
            expect(validator.nullable).toBeInstanceOf(Function);
            expect(validator.nullable.typeName).toBe(typeName);
        });
        qtyValidatorsTested++;
    }

    function testOptional(typeName, validator) {
        it('optional is correctly set', () => {
            expect(validator.optional).toBeInstanceOf(Function);
            expect(validator.optional.typeName).toBe(typeName);
        });

        qtyValidatorsTested++;
    }

    function testUndefinable(typeName, validator) {
        it('undefinable is correctly set', () => {
            expect(validator.undefinable).toBeInstanceOf(Function);
            expect(validator.undefinable.typeName).toBe(typeName);
        });
        qtyValidatorsTested++;
    }

    function testType(typeName, validator, checkNullable = true) {
        testAssert(typeName);

        testValidator(typeName, validator);

        if (checkNullable) {
            testNullable(typeName, validator);
            testOptional(typeName, validator);
            testUndefinable(typeName, validator);
        }

        qtyTypesTested++;
    }

    function testTypeWithArguments(typeName, type) {
        // types that have arguments must be called to produce validators
        const validator = type();

        testType(typeName, validator);

        it('type is incorrectly set - ie.: Types.object() vs Types.object', () => {
            expect(type.typeName).toBeUndefined();
            expect(type.name).toBe('bound validateWithArguments');

            const misLeadArrayofValidator = Types.array.of[validator.typeName];

            expect(misLeadArrayofValidator.nullable).not.toBeInstanceOf(Function);
            expect(misLeadArrayofValidator.optional).not.toBeInstanceOf(Function);
        });
    }

    function testTypeWithoutArguments(typeName, type) {
        // types that do not have arguments are already the validators
        const validator = type;

        testType(typeName, validator);

        it('type is incorrectly set - ie.: Types.string vs Types.string()', () => {
            expect(() => type()).toThrow(SyntaxError);
        });
    }

    /*
    /* manually add types here to avoid tautological tests
    */

    // types that have arguments
    testTypeWithArguments('between', Types.between);
    testTypeWithArguments('between', Types.array.of.between);
    testTypeWithArguments('custom', Types.custom);
    testTypeWithArguments('custom', Types.array.of.custom);
    testTypeWithArguments('equal', Types.equal);
    testTypeWithArguments('equal', Types.array.of.equal);
    testTypeWithArguments('greater', Types.greater);
    testTypeWithArguments('greater', Types.array.of.greater);
    testTypeWithArguments('greaterOrEqual', Types.greaterOrEqual);
    testTypeWithArguments('greaterOrEqual', Types.array.of.greaterOrEqual);
    testTypeWithArguments('in', Types.in);
    testTypeWithArguments('in', Types.array.of.in);
    testTypeWithArguments('inheritance', Types.inheritance);
    testTypeWithArguments('inheritance', Types.array.of.inheritance);
    testTypeWithArguments('inRange', Types.inRange);
    testTypeWithArguments('inRange', Types.array.of.inRange);
    testTypeWithArguments('instance', Types.instance);
    testTypeWithArguments('instance', Types.array.of.instance);
    testTypeWithArguments('instanceStrict', Types.instanceStrict);
    testTypeWithArguments('instanceStrict', Types.array.of.instanceStrict);
    testTypeWithArguments('keyIn', Types.keyIn);
    testTypeWithArguments('keyIn', Types.array.of.keyIn);
    testTypeWithArguments('less', Types.less);
    testTypeWithArguments('less', Types.array.of.less);
    testTypeWithArguments('lessOrEqual', Types.lessOrEqual);
    testTypeWithArguments('lessOrEqual', Types.array.of.lessOrEqual);
    testTypeWithArguments('like', Types.like);
    testTypeWithArguments('like', Types.array.of.like);
    testTypeWithArguments('match', Types.match);
    testTypeWithArguments('match', Types.array.of.match);
    testTypeWithArguments('object', Types.object);
    testTypeWithArguments('object', Types.array.of.object);

    // types that do nothing
    testType('skip', Types.skip, false);

    // types that do not have arguments
    testTypeWithoutArguments('array', Types.array);
    testTypeWithoutArguments('array', Types.array.of.array);
    testTypeWithoutArguments('assigned', Types.assigned);
    testTypeWithoutArguments('assigned', Types.array.of.assigned);
    testTypeWithoutArguments('boolean', Types.boolean);
    testTypeWithoutArguments('boolean', Types.array.of.boolean);
    testTypeWithoutArguments('date', Types.date);
    testTypeWithoutArguments('date', Types.array.of.date);
    testTypeWithoutArguments('dateString', Types.dateString);
    testTypeWithoutArguments('dateString', Types.array.of.dateString);
    testTypeWithoutArguments('even', Types.even);
    testTypeWithoutArguments('even', Types.array.of.even);
    testTypeWithoutArguments('emptyArray', Types.emptyArray);
    testTypeWithoutArguments('emptyArray', Types.array.of.emptyArray);
    testTypeWithoutArguments('emptyObject', Types.emptyObject);
    testTypeWithoutArguments('emptyObject', Types.array.of.emptyObject);
    testTypeWithoutArguments('emptyString', Types.emptyString);
    testTypeWithoutArguments('emptyString', Types.array.of.emptyString);
    testTypeWithoutArguments('float', Types.float);
    testTypeWithoutArguments('float', Types.array.of.float);
    testTypeWithoutArguments('function', Types.function);
    testTypeWithoutArguments('function', Types.array.of.function);
    testTypeWithoutArguments('integer', Types.integer);
    testTypeWithoutArguments('integer', Types.array.of.integer);
    testTypeWithoutArguments('iterable', Types.iterable);
    testTypeWithoutArguments('iterable', Types.array.of.iterable);
    testTypeWithoutArguments('negative', Types.negative);
    testTypeWithoutArguments('negative', Types.array.of.negative);
    testTypeWithoutArguments('nonEmptyArray', Types.nonEmptyArray);
    testTypeWithoutArguments('nonEmptyArray', Types.array.of.nonEmptyArray);
    testTypeWithoutArguments('nonEmptyObject', Types.nonEmptyObject);
    testTypeWithoutArguments('nonEmptyObject', Types.array.of.nonEmptyObject);
    testTypeWithoutArguments('nonEmptyString', Types.nonEmptyString);
    testTypeWithoutArguments('nonEmptyString', Types.array.of.nonEmptyString);
    testTypeWithoutArguments('null', Types.null);
    testTypeWithoutArguments('null', Types.array.of.null);
    testTypeWithoutArguments('number', Types.number);
    testTypeWithoutArguments('number', Types.array.of.number);
    testTypeWithoutArguments('odd', Types.odd);
    testTypeWithoutArguments('odd', Types.array.of.odd);
    testTypeWithoutArguments('positive', Types.positive);
    testTypeWithoutArguments('positive', Types.array.of.positive);
    testTypeWithoutArguments('string', Types.string);
    testTypeWithoutArguments('string', Types.array.of.string);
    testTypeWithoutArguments('thenable', Types.thenable);
    testTypeWithoutArguments('thenable', Types.array.of.thenable);
    testTypeWithoutArguments('undefined', Types.undefined);
    testTypeWithoutArguments('undefined', Types.array.of.undefined);

    it('Quantity of Types tested must match quantity of Methods', () => {
        // qty of asserts
        // times a factor of
        // 1 type
        // plus 1 (for array.of.type)
        // and
        // minus 1 (Types.skip doesn't have an array.of)
        expect(qtyTypesTested).toBe(qtyAsserts * 2 - 1);
    });

    it('Quantity of Validators tested must match quantity of Methods times 6', () => {
        // qty of asserts
        // times a factor of
        // 1 type
        // plus 1 - type.nullable
        // plus 1 - type.optional
        // plus 1 - type.undefinable
        // plus 1 - array.of.type
        // plus 1 - array.of.type.nullable
        // plus 1 - array.of.type.optional
        // plus 1 - array.of.type.undefinable
        // and
        // minus 7 - (Types.skip doesn't have any of those extended validators)
        expect(qtyValidatorsTested).toBe(qtyAsserts * 8 - 7);
    });
});
