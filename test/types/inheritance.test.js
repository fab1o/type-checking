import { Types, typecheck } from '../../src';

class NotParent {}
class Parent {}
class Child extends Parent {}
class Child2 extends Parent {}
class Child3 extends NotParent {}

describe('Types.inheritance', () => {
    it('throw an error when child does not inherit from NotParent', () => {
        expect(() => {
            typecheck(
                {
                    child: Types.inheritance(NotParent)
                },
                [Child]
            );
        }).toThrow(
            '{child} child expected a type that inherits from NotParent but received Child.'
        );
    });

    it('throw an error when child does not inherit from Parent', () => {
        expect(() => {
            typecheck(
                {
                    child: Types.inheritance(Parent)
                },
                [Child3]
            );
        }).toThrow(
            '{child} child expected a type that inherits from Parent but received Child3.'
        );
    });

    it('not throw an error', () => {
        expect(() => {
            typecheck(
                {
                    child: Types.inheritance(Parent)
                },
                [Child]
            );
        }).not.toThrow();
    });

    it('throw an error on array.of', () => {
        expect(() => {
            typecheck(
                {
                    child: Types.array.of.inheritance(Parent)
                },
                [[Child, Child3, Child2]]
            );
        }).toThrow(
            '{child} child expected an Array of types that inherit from Parent but received an Array: [Child, Child3, ...].'
        );
    });

    it('not throw an error on array.of', () => {
        expect(() => {
            typecheck(
                {
                    child: Types.array.of.inheritance(Parent)
                },
                [[Child, Child2]]
            );
        }).not.toThrow();
    });
});
