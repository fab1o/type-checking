import { getTypeToString } from '../../src/util';

describe('getTypeToString', () => {
    it('function definition with native name', () => {
        function func() {}
        const value = getTypeToString(func);

        expect(value).toBe(func.name);
        expect(value).toBe('func');
    });

    it('function variable with native name', () => {
        const funcVar = function () {};
        const value = getTypeToString(funcVar);

        expect(value).toBe(funcVar.name);
        expect(value).toBe('funcVar');
    });

    it('function variable using arrow with native name', () => {
        const funcArrow = () => {};
        const value = getTypeToString(funcArrow);

        expect(value).toBe(funcArrow.name);
        expect(value).toBe('funcArrow');
    });

    it('anonymous functions have no name', () => {
        const value = getTypeToString(() => {});

        expect(value).toBe('a Function');
    });

    it('functions with custom (edited) name', () => {
        const func = () => {};

        Object.defineProperty(func, 'name', { value: 'myCustomName', writable: true });

        const value = getTypeToString(func);

        expect(value).toBe(func.name);
        expect(value).toBe('myCustomName');
    });

    it('class definition with native toString and name (nothing edited)', () => {
        class Account {}

        const className = getTypeToString(Account);

        expect(className).toBe(Account.name);
        expect(className).toBe('Account');

        const account = new Account();
        const instanceName = getTypeToString(account);

        expect(instanceName).toBe(Account.name);
    });

    it('class definition with custom (overridden) toString', () => {
        class Account {
            toString() {
                return 'This.is.Account';
            }
        }

        // Config.nameMethodPriority = Config.NameMethod.toString;

        const className = getTypeToString(Account);

        expect(className).toBe(Account.prototype.toString());

        const account = new Account();
        const instanceName = getTypeToString(account);

        expect(instanceName).toBe(instanceName.toString());
    });

    it('class definition with custom (edited) name', () => {
        class Account {
            static get name() {
                return 'MyCustomAccount';
            }
        }

        const value = getTypeToString(Account);

        expect(value).toBe(Account.name);
    });

    it('class with both custom (overridden) toString and (edited) name', () => {
        class Account {
            static get name() {
                return 'MyCustomAccount';
            }

            toString() {
                return 'This.is.Account';
            }
        }

        const className = getTypeToString(Account);

        // instance toString() has priority over static name as per Config set
        expect(className).toBe(Account.prototype.toString());

        const account = new Account();
        const instanceName = getTypeToString(account);

        expect(instanceName).toBe(account.toString());
    });

    it('simple objects are not instances of a class, so names are simply "Object"', () => {
        const simpleObject = {
            name: 'SimpleObject'
        };

        expect(getTypeToString(simpleObject)).toBe('Object');
    });

    it('tampered objects', () => {
        const obj = {};
        const obj2 = {};

        obj.constructor = null;
        delete obj2.constructor;

        expect(getTypeToString(obj)).toBe('an Object');
        expect(getTypeToString(obj2)).toBe('Object');
    });

    it('should work with Date', () => {
        const output = getTypeToString(Date);

        expect(output).toBe('Date');
    });

    it('should work with Array', () => {
        const output = getTypeToString(Array);

        expect(output).toBe('Array');
    });

    it('should work with Number', () => {
        const output = getTypeToString(Number);

        expect(output).toBe('Number');
    });

    it('should work with String', () => {
        const output = getTypeToString(String);

        expect(output).toBe('String');
    });

    it('should work with Boolean', () => {
        const output = getTypeToString(Boolean);

        expect(output).toBe('Boolean');
    });

    it('should work with NaN', () => {
        const output = getTypeToString(NaN);

        expect(output).toBe('NaN');
    });

    it('should work with Infinity', () => {
        const output = getTypeToString(Infinity);

        expect(output).toBe('Infinity');
    });

    it('null', () => {
        const output = getTypeToString(null);

        expect(output).toBe('null');
    });

    it('null with default value as ""', () => {
        const output = getTypeToString(null, '');

        expect(output).toBe('');
    });
});
