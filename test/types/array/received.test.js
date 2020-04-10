import { Types, typecheck } from '../../../src';

describe('received array of types message', () => {
    const emptyArrayMessage = '{ok} ok expected a Boolean but received an Array: [].';

    it(emptyArrayMessage, () => {
        try {
            typecheck(
                {
                    ok: Types.boolean
                },
                [[]]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(emptyArrayMessage);
        }
    });

    const afewMessage = '{ok} ok expected a Boolean but received an Array: ["Fabio", 1, ...].';

    it(afewMessage, () => {
        try {
            typecheck(
                {
                    ok: Types.boolean
                },
                [['Fabio', 1, 2020]]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(afewMessage);
        }
    });

    const moreItemsMessage = '{ok} ok expected a Boolean but received an Array: [{...}, 1, ...].';

    it(moreItemsMessage, () => {
        try {
            typecheck(
                {
                    ok: Types.boolean
                },
                [[{ name: 'Fabio' }, 1, 2020]]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(moreItemsMessage);
        }
    });
});
