// import { Config } from '../../src';
import { getTypeName, getTypeToString } from '../../src/util';

describe('getTypeName', () => {
    it('function definition with native name', () => {
        function func() {}
        const value = getTypeName(func);

        expect(value).toBe(func.name);
        expect(value).toBe('func');
    });

    it('function variable with native name', () => {
        const funcVar = function () {};
        const value = getTypeName(funcVar);

        expect(value).toBe(funcVar.name);
        expect(value).toBe('funcVar');
    });

    it('function variable using arrow with native name', () => {
        const funcArrow = () => {};
        const value = getTypeName(funcArrow);

        expect(value).toBe(funcArrow.name);
        expect(value).toBe('funcArrow');
    });

    it('anonymous functions have no name', () => {
        const value = getTypeName(() => {});

        expect(value).toBe('');
    });

    it('functions with custom (edited) name', () => {
        const func = () => {};

        Object.defineProperty(func, 'name', { value: 'myCustomName', writable: true });

        const value = getTypeName(func);

        expect(value).toBe(func.name);
        expect(value).toBe('myCustomName');
    });

    it('class definition with native toString and name (nothing edited)', () => {
        class Account {}

        const className = getTypeName(Account);

        expect(className).toBe(Account.name);
        expect(className).toBe('Account');

        const account = new Account();
        const instanceName = getTypeName(account);

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
        const instanceName = getTypeName(account);

        expect(instanceName).toBe(instanceName.toString());
    });

    it('class definition with custom (edited) name', () => {
        class Account {
            static get name() {
                return 'MyCustomAccount';
            }
        }

        const value = getTypeName(Account);

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

        let className, account, instanceName;

        // Config.nameMethodPriority = Config.NameMethod.toString;

        className = getTypeToString(Account);

        // instance toString() has priority over static name as per Config set
        expect(className).toBe(Account.prototype.toString());

        account = new Account();
        instanceName = getTypeToString(account);

        expect(instanceName).toBe(account.toString());

        // now, let's invert the priority in the Config to static name
        // Config.nameMethodPriority = Config.NameMethod.name;

        // and repeat the tests:

        className = getTypeName(Account);

        expect(className).toBe(Account.name);

        account = new Account();
        instanceName = getTypeName(account);

        expect(instanceName).toBe(Account.name);

        // tampered objects

        account.name = null;

        instanceName = getTypeName(account);
        expect(instanceName).toBe(Account.name);

        delete account.name;

        instanceName = getTypeName(account);
        expect(instanceName).toBe(Account.name);

        // tampered classes

        delete Account.name;

        className = getTypeName(Account);
        expect(className).toBe(Account.prototype.toString());

        instanceName = getTypeName(account);
        expect(instanceName).toBe(Account.prototype.toString());
    });

    it('simple objects are not instances of a class, so names are simply "Object"', () => {
        const simpleObject = {
            name: 'SimpleObject'
        };

        expect(getTypeName(simpleObject)).toBe('Object');
    });

    it('tampered objects', () => {
        const obj = {};
        const obj2 = {};

        obj.constructor = null;
        delete obj2.constructor;

        expect(getTypeName(obj)).toBe('Object');
        expect(getTypeName(obj2)).toBe('Object');
    });

    it('Date', () => {
        const output = getTypeName(Date);

        expect(output).toBe('Date');
    });

    it('Array', () => {
        const output = getTypeName(Array);

        expect(output).toBe('Array');
    });

    it('Number', () => {
        const output = getTypeName(Number);

        expect(output).toBe('Number');
    });

    it('String', () => {
        const output = getTypeName(String);

        expect(output).toBe('String');
    });

    it('Boolean', () => {
        const output = getTypeName(Boolean);

        expect(output).toBe('Boolean');
    });

    it('NaN', () => {
        const output = getTypeName(NaN);

        expect(output).toBe('NaN');
    });

    it('Infinity', () => {
        const output = getTypeName(Infinity);

        expect(output).toBe('Number');
    });

    it('null', () => {
        const output = getTypeName(null);

        expect(output).toBe('null');
    });

    it('null with default value as ""', () => {
        const output = getTypeName(null, '');

        expect(output).toBe('');
    });
});
