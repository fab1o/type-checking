import { Types, typecheck } from '../../src';

describe('Types.match()', () => {
    it('type name to be correct', () => {
        expect(Types.match().typeName).toBe('match');
    });

    it('type name of extented functions to be correct', () => {
        expect(Types.match().optional.typeName).toBe('match');
    });

    it('type name of logging functions to be correct', () => {
        expect(Types.match().warn.typeName).toBe('match');
    });

    it('does not throw an error when data is a matched string', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.match(/[^abc]/)
                },
                ['d']
            );
        }).not.toThrow();
    });

    it('throw an error when data is anything but a string', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.match(/[^abc]/)
                },
                [123]
            );
        }).toThrow(
            '{name} name expected a String that matches /[^abc]/ but received a Number: 123'
        );
    });

    it('throw an error when data is an empty string', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.match(/[^abc]/)
                },
                ['']
            );
        }).toThrow(
            '{name} name expected a String that matches /[^abc]/ but received a String: ""'
        );
    });

    it('throw an error when data is not a matched string', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.match(/[^abc]/)
                },
                ['a']
            );
        }).toThrow(
            '{name} name expected a String that matches /[^abc]/ but received a String: "a"'
        );
    });

    it('throw an error for optional when data is an empty string', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.match(/[^abc]/).optional
                },
                ['']
            );
        }).toThrow(
            '{name} name expected a String that matches /[^abc]/ or null or undefined but received a String: ""'
        );
    });

    it('does not throw an error for optional when data is undefined', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.match().optional
                },
                []
            );
        }).not.toThrow();
    });

    it('does not throw an error for optional when data is null', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.match().optional
                },
                [null]
            );
        }).not.toThrow();
    });
});
