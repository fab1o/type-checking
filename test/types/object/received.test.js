import { Types, typecheck } from '../../../src';

describe('received messages', () => {
    const emptyObjMessage = '{ok} ok expected a Boolean but received an Object: {}.';

    it(emptyObjMessage, () => {
        try {
            typecheck(
                {
                    ok: Types.boolean
                },
                [{}]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(emptyObjMessage);
        }
    });

    const afewMessage =
        '{ok} ok expected a Boolean but received an Object: {name:"Fabio", code:1, ...}.';

    it(afewMessage, () => {
        try {
            typecheck(
                {
                    ok: Types.boolean
                },
                [
                    {
                        name: 'Fabio',
                        code: 1,
                        year: 2020
                    }
                ]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(afewMessage);
        }
    });

    const moreObjMessage =
        '{ok} ok expected a Boolean but received an Object: {person:{...}, code:1, ...}.';

    it(moreObjMessage, () => {
        try {
            typecheck(
                {
                    ok: Types.boolean
                },
                [
                    {
                        person: {
                            name: 'Fabio'
                        },
                        code: 1,
                        year: 2020
                    }
                ]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(moreObjMessage);
        }
    });
});
