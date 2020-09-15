import { Asserts } from '../src/types/asserts';

describe('Asserts', () => {
    const simpleAssertModel = {
        singular: expect.any(String),
        plural: expect.any(String),
        expectArgs: expect.any(Boolean),
        validateCreator: expect.any(Function)
    };

    const stringifingAssertModel = {
        singular: expect.any(String),
        plural: expect.any(String),
        expectArgs: expect.any(Boolean),
        validateCreator: expect.any(Function),
        stringify: expect.any(Function)
    };

    const customAssertModel = {
        expectArgs: expect.any(Boolean),
        validateCreator: expect.any(Function)
    };

    const simpleAsserts = [
        'array',
        'assigned',
        'between',
        'boolean',
        'date',
        'dateString',
        'emptyArray',
        'emptyObject',
        'emptyString',
        'equal',
        'even',
        'float',
        'function',
        'greater',
        'greaterOrEqual',
        'inRange',
        'integer',
        'iterable',
        'less',
        'lessOrEqual',
        'negative',
        'nonEmptyArray',
        'nonEmptyObject',
        'nonEmptyString',
        'null',
        'number',
        'object',
        'odd',
        'positive',
        'string',
        'thenable',
        'undefined'
    ];
    const customAsserts = ['custom', 'skip'];
    const stringifingAsserts = [
        'in',
        'inheritance',
        'instance',
        'instanceStrict',
        'keyIn',
        'like',
        'match'
    ];

    it('expects asserts to have correct construct', () => {
        const qtyAsserts = Object.keys(Asserts).length;

        expect.assertions(qtyAsserts);

        simpleAsserts.forEach((a) => {
            expect(Asserts[a]).toMatchObject(simpleAssertModel);
        });

        stringifingAsserts.forEach((a) => {
            expect(Asserts[a]).toMatchObject(stringifingAssertModel);
        });

        customAsserts.forEach((a) => {
            expect(Asserts[a]).toMatchObject(customAssertModel);
        });
    });
});
