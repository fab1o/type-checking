import { Types, typecheck } from '../../../src';

describe('Types.object - expected messages', () => {
    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.object()
                },
                [0]
            );
        }).toThrow('{ok} ok expected an Object but received a Number: 0.');
    });

    it('throw an error on instance strict', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.instanceStrict(Object)
                },
                [0]
            );
        }).toThrow('{ok} ok expected an instance of Object but received a Number: 0.');
    });
});
