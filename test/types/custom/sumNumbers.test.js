import { Types, typecheck } from '../../../src';

function sumNumbers(options) {
    const params = {
        options: Types.object({
            num1: Types.number,
            num2: Types.custom(
                customValidator,
                'if options.num1 and options.num3 are provided'
            ),
            num3: Types.number
        })
    };

    typecheck(sumNumbers, params, arguments);

    const { num1, num2, num3 } = options;

    return num1 + num2 + num3;
}

function customValidator(value, input) {
    if (input.num1 >= 0 && input.num3 >= 0) {
        return value;
    }

    return false;
}

describe('sumNumbers', () => {
    it('throw an error', () => {
        expect(() => {
            sumNumbers({ num1: 7, num3: 10 });
        }).toThrow(
            'sumNumbers({ num1, num2, num3 }) options.num2 expected if options.num1 and options.num3 are provided but received undefined.'
        );
    });

    it('sum correctly', () => {
        expect(sumNumbers({ num1: 1, num2: 2, num3: 3 })).toBe(6);
    });

    it('fail', () => {
        expect(() => {
            sumNumbers();
        }).toThrow(SyntaxError);
    });
});
