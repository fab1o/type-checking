import { Types, typecheck } from '../../src';

import Parent from './relationship/constructor/parent';

import Client from './client';

describe('Class', () => {
    it('wrong argument is provided', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean
                },
                [Parent]
            );
        }).toThrow('{ok} ok expected a Boolean but received MyParent.');
    });

    it('class name is used for error message', () => {
        expect(() => {
            new Client(2020);
        }).toThrow(
            'Client(name) name expected a String or null or undefined but received a Number: 2020.'
        );
    });

    it('method name is used for error message', () => {
        expect(() => {
            const client = new Client();

            client.changeInfo();
        }).toThrow(
            'Client.changeInfo(name, year) name expected a String but received undefined.'
        );
    });
});
