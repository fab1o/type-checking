import { Asserts } from '../src/types/asserts';

describe('Asserts', () => {
    let customAssertModel;
    let simpleAssertModel;

    let customAsserts;
    let simpleAsserts;

    let qtyAssertsWithExtension;
    let qtyAssertsWithoutExtension;

    let qtyAsserts;

    beforeAll(() => {
        customAssertModel = {
            assertName: expect.any(String),
            expectArgs: expect.any(Boolean),
            validateCreator: expect.any(Function)
        };

        simpleAssertModel = {
            assertName: expect.any(String),
            singular: expect.any(String),
            plural: expect.any(String),
            expectArgs: expect.any(Boolean),
            validateCreator: expect.any(Function)
        };

        customAsserts = ['custom', 'skip'];

        simpleAsserts = [
            'array',
            // 'arrayLike',
            'arrayBufferView',
            'assigned',
            // 'between',
            'boolean',
            'date',
            'dateString',
            // 'emptyArray',
            // 'emptyObject',
            // 'emptyString',
            // 'equal',
            // 'even',
            // 'float',
            'function',
            // 'greater',
            'greaterOrEqual',
            // 'hasLength',
            'in',
            // 'inheritance',
            // 'inRange',
            // 'instance',
            'instanceStrict',
            'integer',
            // 'iterable',
            'keyIn',
            // 'less',
            // 'lessOrEqual',
            'like',
            // 'match',
            // 'negative',
            // 'nonEmptyArray',
            'nonEmptyObject',
            'nonEmptyString',
            // 'nan',
            // 'null',
            'number',
            'object',
            // 'odd',
            'positive',
            'string'
            // 'thenable',
            // 'undefined'
        ];

        qtyAsserts = Asserts.length;

        qtyAssertsWithExtension = Asserts.filter((a) => a.isExtensible).length;
        qtyAssertsWithoutExtension = Asserts.filter((a) => !a.isExtensible).length;
    });

    it('quantity of Asserts with extension and without extension should be correct', () => {
        expect(qtyAsserts).toBe(qtyAssertsWithExtension + qtyAssertsWithoutExtension);
    });

    it('expects asserts to have correct construct', () => {
        simpleAsserts.forEach((name) => {
            expect(Asserts.find((a) => a.assertName === name)).toMatchObject(
                simpleAssertModel
            );
        });

        customAsserts.forEach((name) => {
            expect(Asserts.find((a) => a.assertName === name)).toMatchObject(
                customAssertModel
            );
        });
    });
});
