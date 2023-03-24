import { Types, typecheck } from '../../src';

class NotParent {
    toString() {
        return 'MyNotParent';
    }
}
class Parent {
    toString() {
        return 'MyParent';
    }
}
class Child extends Parent {
    toString() {
        return 'MyChild';
    }
}
class Child2 extends Parent {
    toString() {
        return 'MyChild2';
    }
}
class Child3 extends NotParent {
    toString() {
        return 'MyChild3';
    }
}

describe('Types.inheritance', () => {
    it('type name to be correct', () => {
        expect(Types.inheritance().typeName).toBe('inheritance');
    });

    it('throw an error when child does not inherit from NotParent', () => {
        expect(() => {
            typecheck(
                {
                    child: Types.inheritance(NotParent)
                },
                [Child]
            );
        }).toThrow(
            '{child} child expected a type that inherits from MyNotParent but received MyChild.'
        );
    });

    it('throw an error for Child3 because it does not inherit from Parent', () => {
        expect(() => {
            typecheck(
                {
                    child: Types.inheritance(Parent)
                },
                [Child3]
            );
        }).toThrow(
            '{child} child expected a type that inherits from MyParent but received MyChild3.'
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
            '{child} child expected an Array of types that inherit from MyParent but received an Array: [MyChild, MyChild3, ...].'
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
