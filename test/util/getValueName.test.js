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

    it('anonymous functions have no name', () => {
        const output = getValueName(() => {});

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

        // static name now has priority over instance toString as per Config set
        expect(className).toBe(Account.name);

        const account = new Account();
        const instanceName = getValueName(account);

        expect(instanceName).toBe(Account.name);
    });

    it('simple objects are not instances of a class, so names are simply "Object"', () => {
        const simpleObject = {
            name: 'SimpleObject'
        };

        expect(getValueName(simpleObject)).toBe('an Object: {name:"SimpleObject"}');

        // test without stringifying
        expect(
            getValueName(simpleObject, {
                includeStrigify: false
            })
        ).toBe('an Object');

        // test new Number
        expect(getValueName(new Object(simpleObject))).toBe(
            'an Object: {name:"SimpleObject"}'
        );
    });

    it('Number', () => {
        const value = 1;

        expect(getValueName(value)).toBe('a Number: 1');

        // test without stringifying
        expect(
            getValueName(value, {
                includeStrigify: false
            })
        ).toBe('a Number');

        // test new Number
        expect(getValueName(new Number(value))).toBe('a Number: 1');
    });

    it('Array', () => {
        const value = [1, 2, 3];

        expect(getValueName(value)).toBe('an Array: [1, 2, ...]');

        // test without stringifying
        expect(
            getValueName(value, {
                includeStrigify: false
            })
        ).toBe('an Array');

        // test new Array
        const array = new Array();

        array.push(1);
        array.push(2);
        array.push(3);

        expect(getValueName(array)).toBe('an Array: [1, 2, ...]');
    });

    it('String', () => {
        const value = '';

        expect(getValueName(value)).toBe('a String: ""');

        // test without stringifying
        expect(
            getValueName(value, {
                includeStrigify: false
            })
        ).toBe('a String');

        // test new String
        expect(getValueName(new String(value))).toBe('a String: ""');
    });

    it('Boolean', () => {
        const value = true;

        expect(getValueName(value)).toBe('a Boolean: true');

        // test without stringifying
        expect(
            getValueName(value, {
                includeStrigify: false
            })
        ).toBe('a Boolean');

        // test new Boolean
        expect(getValueName(new Boolean(value))).toBe('a Boolean: true');
    });

    it('undefined', () => {
        let value;

        const output = getValueName(value);

        expect(output).toBe('undefined');
    });

    it('null', () => {
        const value = null;

        const output = getValueName(value);

        expect(output).toBe('null');
    });

    it('NaN', () => {
        const value = '' / '';

        const output = getValueName(value);

        expect(output).toBe('NaN');
    });

    it('Infinity', () => {
        const value = 1 / '';

        const output = getValueName(value);

        expect(output).toBe('a Number: Infinity');
    });

    it('Date', () => {
        const value = new Date();

        const output = getValueName(value);

        expect(output).toMatch(/a Date: ".*"/);
    });

    it('String with espaced chars', () => {
        const value = 'hey "someone",\n this isn\'t a letter.\f\r';

        const output = getValueName(value);

        expect(output).toBe('a String: "hey "someone",\\n this isn\'t a letter.\\f\\r"');
    });
});
