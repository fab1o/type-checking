import { Types, typecheck } from '../../../src';

describe('Types.object - received messages', () => {
    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean
                },
                [{}]
            );
        }).toThrow('{ok} ok expected a Boolean but received an Object: {}.');
    });

    it('multiple properties', () => {
        expect(() => {
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
        }).toThrow(
            '{ok} ok expected a Boolean but received an Object: {name:"Fabio", code:1, ...}.'
        );
    });

    it('object in object', () => {
        expect(() => {
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
        }).toThrow(
            '{ok} ok expected a Boolean but received an Object: {person:{...}, code:1, ...}.'
        );
    });

    it('circualr reference', () => {
        expect(() => {
            const obj = {};

            obj.myself = obj;

            typecheck(
                {
                    ok: Types.boolean
                },
                [obj]
            );
        }).toThrow('{ok} ok expected a Boolean but received an Object: {myself:{...}}.');
    });

    it('throw an error for object without constructor', () => {
        expect(() => {
            const obj = Object.create(null, {});

            obj.prop = 'prop';

            typecheck(
                {
                    ok: Types.boolean
                },
                [obj]
            );
        }).toThrow('{ok} ok expected a Boolean but received an Object: {prop:"prop"}.');
    });

    it('throw an error for special object', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean
                },
                [new URL('http://a.com')]
            );
        }).toThrow('{ok} ok expected a Boolean but received an URL: "http://a.com/".');
    });
});
