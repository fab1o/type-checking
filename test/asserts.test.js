import { Asserts } from '../src/types/asserts';

describe('Asserts', () => {
    const customAssertModel = {
        assertName: expect.any(String),
        expectArgs: expect.any(Boolean),
        validateCreator: expect.any(Function)
    };

    const simpleAssertModel = {
        assertName: expect.any(String),
        singular: expect.any(String),
        plural: expect.any(String),
        expectArgs: expect.any(Boolean),
        validateCreator: expect.any(Function)
    };

    const customAsserts = ['custom', 'skip'];

    const simpleAsserts = [
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

    const qtyAsserts = Asserts.length;

    it('Quantity of Asserts with extension and without extension to be correct', () => {
        let qtyAssertsWithExtension = 0;
        let qtyAssertsWithoutExtension = 0;

        Asserts.forEach((assert) => {
            if (assert.isExtensible) {
                qtyAssertsWithExtension++;
            } else {
                qtyAssertsWithoutExtension++;
            }
        });

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
