// import { Config } from '../../src';
import { getValueName } from '../../src/util';

describe('getValueName', () => {
    it('function definition with native name', () => {
        function func() {}
        const output = getValueName(func);

        expect(output).toBe(func.name);
        expect(output).toBe('func');
    });

    it('function variable with native name', () => {
        const funcVar = function () {};
        const output = getValueName(funcVar);

        expect(output).toBe(funcVar.name);
        expect(output).toBe('funcVar');
    });

    it('function variable using arrow with native name', () => {
        const funcArrow = () => {};
        const output = getValueName(funcArrow);

        expect(output).toBe(funcArrow.name);
        expect(output).toBe('funcArrow');
    });

    it('anonymous function', () => {
        const output = getValueName(() => {});

        expect(output).toBe('a Function');
    });

    it('anonymous function with type name', () => {
        const output = getValueName(() => {}, { includeTypeName: true });

        expect(output).toBe('a Function');
    });

    it('functions with custom (edited) name', () => {
        const func = () => {};

        Object.defineProperty(func, 'name', { value: 'myCustomName', writable: true });

        const output = getValueName(func);

        expect(output).toBe(func.name);
        expect(output).toBe('myCustomName');
    });

    it('class definition with native toString and name (nothing edited)', () => {
        class Account {}

        const className = getValueName(Account);

        expect(className).toBe(Account.name);

        const account = new Account();
        const instanceName = getValueName(account);

        expect(instanceName).toBe(Account.name);
    });

    // it('class definition with custom (overridden) toString', () => {
    //     class Account {
    //         toString() {
    //             return 'This.is.Account';
    //         }
    //     }

    //     Config.nameMethodPriority = Config.NameMethod.toString;

    //     const className = getValueName(Account);

    //     expect(className).toBe(Account.prototype.toString());

    //     const account = new Account();
    //     const instanceName = getValueName(account);

    //     expect(instanceName).toBe(instanceName.toString());
    // });

    it('class definition with custom (edited) name', () => {
        class Account {
            static get name() {
                return 'MyCustomAccount';
            }
        }

        const output = getValueName(Account);

        expect(output).toBe(Account.name);
        expect(output).toBe('MyCustomAccount');
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

        // let className, account, instanceName;

        // Config.nameMethodPriority = Config.NameMethod.toString;

        // className = getValueName(Account);

        // // instance toString() has priority over static name as per Config set
        // expect(className).toBe(Account.prototype.toString());

        // account = new Account();
        // instanceName = getValueName(account);

        // expect(instanceName).toBe(account.toString());

        // now, let's invert the priority in the Config to static name
        // Config.nameMethodPriority = Config.NameMethod.name;

        // and repeat the tests:

        const className = getValueName(Account);

        expect(className).toBe(Account.prototype.toString());

        const account = new Account();
        const instanceName = getValueName(account);

        expect(instanceName).toBe(account.toString());

        const noDifference = getValueName(account, { includeTypeName: true });

        expect(noDifference).toBe(account.toString());
    });

    it('should work with simple object', () => {
        const simpleObject = {
            name: 'SimpleObject'
        };

        const output = getValueName(simpleObject, { includeTypeName: true });

        expect(output).toBe('an Object: {name:"SimpleObject"}');
    });

    it('should work with simple object without type name', () => {
        const simpleObject = {
            name: 'SimpleObject'
        };

        const output = getValueName(simpleObject);

        expect(output).toBe('{name:"SimpleObject"}');
    });

    it('should work with new Object', () => {
        const simpleObject = {
            name: 'SimpleObject'
        };

        // eslint-disable-next-line no-new-object
        const output = getValueName(new Object(simpleObject), { includeTypeName: true });

        expect(output).toBe('an Object: {name:"SimpleObject"}');
    });

    it('should work with Number', () => {
        const value = 1;

        const output = getValueName(value, { includeTypeName: true });

        expect(output).toBe('a Number: 1');
    });

    it('should work with Number without type name', () => {
        const value = 1;

        const output = getValueName(value);

        expect(output).toBe('1');
    });

    it('should work with new Number', () => {
        const value = 1;

        const output = getValueName(new Number(value), { includeTypeName: true });

        expect(output).toBe('a Number: 1');
    });

    it('should work with Array', () => {
        const value = [1, 2, 3];

        const output = getValueName(value, { includeTypeName: true });

        expect(output).toBe('an Array: [1, 2, ...]');
    });

    it('should work with Array without type name', () => {
        const value = [1, 2, 3];

        const output = getValueName(value);

        expect(output).toBe('[1, 2, ...]');
    });

    it('should work with new Array', () => {
        const array = new Array();

        array.push(1);
        array.push(2);
        array.push(3);

        const output = getValueName(array, { includeTypeName: true });

        expect(output).toBe('an Array: [1, 2, ...]');
    });

    it('should work with String', () => {
        const value = 'str';

        const output = getValueName(value, { includeTypeName: true });

        expect(output).toBe('a String: "str"');
    });

    it('should work with String without type name', () => {
        const value = 'str';

        const output = getValueName(value);

        expect(output).toBe('"str"');
    });

    it('should work with new String', () => {
        const value = 'str';

        const output = getValueName(new String(value), { includeTypeName: true });

        expect(output).toBe('a String: "str"');
    });

    it('should work with Boolean', () => {
        const value = true;

        const output = getValueName(value, { includeTypeName: true });

        expect(output).toBe('a Boolean: true');
    });

    it('should work with Boolean without type name', () => {
        const value = true;

        const output = getValueName(value);

        expect(output).toBe('true');
    });

    it('should work with new Boolean', () => {
        const value = true;

        const output = getValueName(new Boolean(value), { includeTypeName: true });

        expect(output).toBe('a Boolean: true');
    });

    it('should work with undefined', () => {
        let value;

        const output = getValueName(value, { includeTypeName: true });

        expect(output).toBe('undefined');
    });

    it('should work with undefined without type name', () => {
        let value;

        const output = getValueName(value);

        expect(output).toBe('undefined');
    });

    it('should work with null', () => {
        const value = null;

        const output = getValueName(value, { includeTypeName: true });

        expect(output).toBe('null');
    });

    it('should work with null without type name', () => {
        const value = null;

        const output = getValueName(value);

        expect(output).toBe('null');
    });

    it('should work with NaN', () => {
        const value = '' / '';

        const output = getValueName(value, { includeTypeName: true });

        expect(output).toBe('NaN');
    });

    it('should work with NaN without type name', () => {
        const value = '' / '';

        const output = getValueName(value);

        expect(output).toBe('NaN');
    });

    it('should work with Infinity', () => {
        const value = 1 / '';

        const output = getValueName(value, { includeTypeName: true });

        expect(output).toBe('a Number: Infinity');
    });

    it('should work with Infinity without type name', () => {
        const value = 1 / '';

        const output = getValueName(value);

        expect(output).toBe('Infinity');
    });

    it('should work with -Infinity without type name', () => {
        const value = (1 / '') * -1;

        const output = getValueName(value);

        expect(output).toBe('-Infinity');
    });

    it('should work with Date', () => {
        const value = new Date();

        const output = getValueName(value, { includeTypeName: true });

        expect(output).toMatch(/a Date: "\d.*"/);
    });

    it('should work with Date without type name', () => {
        const value = new Date();

        const output = getValueName(value);

        expect(output).toMatch(/"\d.*"/);
    });

    it('should work with String with espaced chars', () => {
        const value = 'hey "someone",\n this isn\'t a letter.\f\r';

        const output = getValueName(value, { includeTypeName: true });

        expect(output).toBe('a String: "hey "someone",\\n this isn\'t a letter.\\f\\r"');
    });
});
