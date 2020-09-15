<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Migrating from Check-types](#migrating-from-check-types)
    -   [Important notes](#important-notes)
-   [Configuration](#configuration)
    -   [Configuration options](#configuration-options)
-   [Types](#types)
    -   [Array of Types](#array-of-types)
    -   [Non-empty Array of Types](#non-empty-array-of-types)
    -   [Nullable Types](#nullable-types)
    -   [Undefinable Types](#undefinable-types)
    -   [Optional Types](#optional-types)
-   [Named Arguments](#named-arguments)
    -   [Advantages of Named Arguments](#advantages-of-named-arguments)
-   [User-defined Types](#user-defined-types)
    -   [Example of a user-defined type that receives no arguments](#example-of-a-user-defined-type-that-receives-no-arguments)
    -   [Example of a user-defined type that receives arguments](#example-of-a-user-defined-type-that-receives-arguments)
-   [Typecheck](#typecheck)
    -   [1. Class methods](#1-class-methods)
    -   [2. Class constructor](#2-class-constructor)
    -   [3. Stand-alone Function](#3-stand-alone-function)
    -   [4. Stand-alone data](#4-stand-alone-data)
    -   [Obfuscated class/function names](#obfuscated-classfunction-names)
        -   [1. Re-write the native class static name property](#1-re-write-the-native-class-static-name-property)
        -   [2. Pass a string to represent the class/function](#2-pass-a-string-to-represent-the-classfunction)
        -   [3. Override toString method](#3-override-tostring-method)
        -   [4. Update keep_fnames](#4-update-keep_fnames)
    -   [Arguments](#arguments)
        -   [1. As the arguments object](#1-as-the-arguments-object)
        -   [2. As the rest parameter](#2-as-the-rest-parameter)
        -   [3. As an Object](#3-as-an-object)
-   [Typecheck.atLeastOne](#typecheckatleastone)
-   [Custom Validation](#custom-validation)
-   [Best Practices](#best-practices)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Migrating from Check-types

[Check-types.js](https://github.bamtech.co/fed-packages/check-types) is included in `@fab1o/type-checking`.

Steps for migration:

1. Run `npm uninstall check-types`
2. Run `npm install @fab1o/type-checking`
3. Re-write your imports:

```js
import { Check } from '@fab1o/type-checking'; // same as: import Check from '@fab1o/check-types';

const { boolean, instanceStrict, nonEmptyString, number, ... } = Check;
```

#### Important notes

-   If you use `check-types` version lower than `10.0.0` you may have issues with obsolete asserts like `includes`. If that's the case, make sure you upgrade to the latest version of `check-types` when proceeding with the migration steps.

-   All the most important asserts in `check-types` map to `Types` - i.e.: `instanceStrict` is the same as `Types.instanceStrict()`

-   Notice that `contains` and `containsKey` do not exist in `Types`. If you rely on these asserts, switch to `Types.in()` and `Types.keyIn()` which are exactly the same as `contains` and `containsKey` respectively.

## Configuration

Config is a static utility used to set options for type-checking.

```js
import { Config } from '@fab1o/type-checking';

Config.setup(options);
```

### Configuration options

| Option             | Type                                                                                                | Default                                                                                                       | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| ErrorType          | [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)     | [`SyntaxError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) | Error type.                                                                 |
| etceteraOn         | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | `true`                                                                                                        | If ", ... " part in the parameters list is shown.                           |
| parentsOn          | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | `true`                                                                                                        | If the param's parent name is in the error message.                         |
| displayParamExt    | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | `true`                                                                                                        | If error message informs user it accepts null or undefined.                 |
| expectedMessage    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)   | `'expected'`                                                                                                  | "expected..." error message part.                                           |
| receivedMessage    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)   | `'but received'`                                                                                              | "but received..." error message part.                                       |
| withPropsMessage   | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)   | `'with properties'`                                                                                           | "with properties..." error message part.                                    |
| nameMethodPriority | `NameMethod`                                                                                        | `'name'`                                                                                                      | The method used as a priority to get the object name for the error message. |

| NameMethod | value        | Description                                                                                                                      |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| name       | `'name'`     | Function's property **[name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)**   |
| toString   | `'toString'` | Object's method **[toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)** |

**Example:**

```js
import { Config } from '@fab1o/type-checking';

class MyCustomError extends Error {}

Config.setup({
    ErrorType: MyCustomError,
    nameMethodPriority: Config.NameMethod.toString
});

// resets all configuration to default
Config.reset();
```

## Types

Types allow you to define a data type for a parameter in which validation will occur, except `Types.skip` which will not validate data.

If data doesn't meet the Type description, a error will be thrown.

| Type name                         | Type description                                                                             |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| `Types.array`                     | where data is an Array                                                                       |
| `Types.assigned`                  | where data is not **null** or **undefined**                                                  |
| `Types.between(a, b)`             | where data is a Number between `a` and `b`                                                   |
| `Types.boolean`                   | where data is a Boolean                                                                      |
| `Types.custom(a, [b], [...args])` | where data is validated by `a` Function and `b` is a String. [More info](#custom-validation) |
| `Types.date`                      | where data is a Date                                                                         |
| `Types.dateString`                | where data is a String in ISO datetime format                                                |
| `Types.emptyArray`                | where data is an empty Array                                                                 |
| `Types.emptyObject`               | where data is an empty Object                                                                |
| `Types.emptyString`               | where data is an empty String                                                                |
| `Types.equal(a)`                  | where data === `a`                                                                           |
| `Types.even`                      | where data is an even Number                                                                 |
| `Types.float`                     | where data is a float Number                                                                 |
| `Types.function`                  | where data is a Function                                                                     |
| `Types.greater(a)`                | where data is a Number greater than `a`                                                      |
| `Types.greaterOrEqual(a)`         | where data is a Number greater or equal to `a`                                               |
| `Types.in(a)`                     | where data is a value in `a` Array/Object                                                    |
| `Types.inheritance(a)`            | where data is a type that inherits from `a` type                                             |
| `Types.inRange(a, b)`             | where data is a Number in the range `a` to `b`                                               |
| `Types.instance(a)`               | where data is an instance of `a`                                                             |
| `Types.instanceStrict(a)`         | where data is an instance strict of `a`                                                      |
| `Types.integer`                   | where data is an integer                                                                     |
| `Types.iterable`                  | where data is an iterable object                                                             |
| `Types.keyIn(a)`                  | where data is a key in `a` Array/Object                                                      |
| `Types.less(a)`                   | where data is a Number lower than `a`                                                        |
| `Types.lessOrEqual(a)`            | where data is a Number lower or equal to `a`                                                 |
| `Types.like(a)`                   | where data is an Object that is like `a` Object                                              |
| `Types.match(a)`                  | where data is a String that matches `a` regular expression                                   |
| `Types.negative`                  | where data is a Number lower than 0                                                          |
| `Types.nonEmptyArray`             | where data is a non-empty Array                                                              |
| `Types.nonEmptyObject`            | where data is a non-empty Object                                                             |
| `Types.nonEmptyString`            | where data is a non-empty String                                                             |
| `Types.null`                      | where data is **null**                                                                       |
| `Types.number`                    | where data is a Number                                                                       |
| `Types.object([a])`               | where data is an Object that is like `a` Object built with **Types**                         |
| `Types.odd`                       | where data is an odd Number                                                                  |
| `Types.positive`                  | where data is a Number greater than 0                                                        |
| `Types.skip`                      | where data is ignored (typecheck is not performed)                                           |
| `Types.string`                    | where data is a String                                                                       |
| `Types.thenable`                  | where data is a Promise                                                                      |
| `Types.undefined`                 | where data is **undefined**                                                                  |

**Example:**

User is required to provide a String.

```js
function setName(name) {
    const params = {
        name: Types.string
    };

    typecheck(setName, params, arguments);
}
```

-   It accepts any String
-   It does not accept **null**
-   It does not accept **undefined**

### Array of Types

User is required to provide an array of a type and Array can be empty.

| Type                         | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| `Types.array.of.string`      | where data is an Array of strings or an empty Array          |
| `Types.array.of.instance(a)` | where data is an Array of instances of `a` or an empty Array |

etc...

To not allow an empty Array, use the following:

### Non-empty Array of Types

User is required to provide an array of a type and Array cannot be empty.

| Type                                 | Description                                |
| ------------------------------------ | ------------------------------------------ |
| `Types.nonEmptyArray.of.string`      | where data is an Array of strings          |
| `Types.nonEmptyArray.of.instance(a)` | where data is an Array of instances of `a` |

etc...

### Nullable Types

User is required to provide data or **null**.

```js
function setName(name) {
    const params = {
        name: Types.string.nullable
    };

    typecheck(setName, params, arguments);
}
```

-   It accepts any String
-   It accepts **null**
-   It does not accept **undefined**

All types can be nullable except `Types.skip`.

### Undefinable Types

User is not required to provide data and data cannot be **null**. Undefinable types enable users to omit arguments for some parameters.

```js
function setName(name) {
    const params = {
        name: Types.string.undefinable
    };

    typecheck(setName, params, arguments);
}
```

-   It accepts any String
-   It accepts **undefined**
-   It does not accept **null**

All types can be undefinable except `Types.skip`.

### Optional Types

User is not required to provide data and data can be **null**. Optional types enable users to omit arguments for some parameters or provide **null**.

```js
function setName(name) {
    const params = {
        name: Types.string.optional
    };

    typecheck(setName, params, arguments);
}
```

-   It accepts any String
-   It accepts **undefined**
-   It accepts **null**

All types can be optional except `Types.skip`.

It's best to keep optional and undefinable parameters in the end of the parameter list in order for users to be able to omit arguments for those parameters.

**Wrong**:

```js
const params = {
    balance: Types.number.optional,
    name: Types.string
};
```

**Correct**:

```js
const params = {
    name: Types.string,
    balance: Types.number.optional
};
```

## Named Arguments

Named arguments enable users to specify an argument for a parameter by associating the argument with the parameter's name rather than with the parameter's position in the parameter list.

Use `Types.object()` and pass in more types:

```js
function addAccount(options) {
    const params = {
        options: Types.object({
            id: Types.number,
            name: Types.string
        })
    };

    typecheck(addAccount, params, arguments);
}

createAccount();
// error: "addAccount(options) options expected an Object with properties but received undefined."

createAccount({});
// error: "addAccount({ id, name }) options.id expected a Number but received undefined."
```

### Advantages of Named Arguments

-   Free the user from the need to remember or to look up the order of parameters in the parameter list because the parameter for each argument can be specified by name.
-   Eliminate the requirement to place optional parameters in the end of the parameter list because there is no parameter list.

```js
createAccount({
    name: 'Fabio',
    isActive: true
    id: 10
});
// success
```

## User-defined Types

An user-defined type is an alternative to `Types.custom` for a custom type that is more commonly used.

There are two kinds of types:

-   Types that receive no arguments - i.e.: `Types.string`
-   Types that receive arguments - i.e.: `Types.between(a, b)` receives 2 arguments

To create an user-defined type, use the **addType** function:

```js
import { addType } from '@fab1o/type-checking';

addType(name, validator, [options]);
```

**Where:**

-   `name` - **String** is the name of the type.
-   `validator` - **Function**: `function(value: *, input: Array|Object, [...args]: Array): boolean;`
    -   `value` - the data being validated for a param using this type.
    -   `input` - all the data (user input) given to typecheck. Helpful for comparison between different param values.
    -   `args` - optional **Array** of the extra arguments provided by you to the type.
-   `options` - optional **Object** with:
    -   `singular` - optional **String**. Default: `name`.
    -   `plural` - optional **String**. Default: `name + "s"`.
    -   `expectArgs` - optional **Boolean**. Default: `false`. Whether or not type receive arguments.
    -   `autoDisplayArgs` - optional **Boolean**. Default: `true`. Whether or not automatically display arguments.
    -   `stringify` - optional **Function** to custom stringify the arguments of the type, in case there is one.

### Example of a user-defined type that receives no arguments

Let's create a type `berry` that converts the user value into a String and checks if it contains the word "berry".

```js
import { Types, typecheck, addType } from '@fab1o/type-checking';

const customValidator_isBerry = (value, input) => {
    return String(value).indexOf('berry') !== -1;
};

addType('berry', customValidator_isBerry, {
    singular: 'a Berry',
    plural: 'berries'
});

// Now our type is available in Types.

function addFruits(fruits) {
    const params = {
        fruits: Types.array.of.berry
    };

    typecheck(addFruits, params, arguments);
}

addFruits(['blueberry', 'banana']);
// error: "addFruits(fruis) fruis expected an Array of berries but received..."

addFruits(['blueberry', 'strawberry']);
// success
```

We can also make it an optional param:

```js
function addFruits(fruits) {
    const params = {
        fruits: Types.array.of.berry.optional
    };

    typecheck(addFruits, params, arguments);
}

addFruits(); // success
```

### Example of a user-defined type that receives arguments

Let's create a type `browser` that receives arguments. It checks if data is any of the arguments we provided. We will use [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) to look up the list of arguments.

Let's use 3 arguments for this type. There is no limit for the number of arguments passed to the type.

We must set **`expectArgs`** to true.

Optionally, for custom singular/plural template, use brackets from `{a}` to `{f}` in lowercase. Limited to 6.

```js
import { Types, typecheck, addType } from '@fab1o/type-checking';

const customValidator_isBrowser = (value, input, ...args) => {
    return args.find((arg) => arg === value);
};

addType('browser', customValidator_isBrowser, {
    singular: 'a Browser: {a}, {b} or {c}',
    plural: 'Browsers: {a}, {b} or {c}',
    expectArgs: true
});

function checkBrowser(browser) {
    const params = {
        browser: Types.browser('chrome', 'firefox', 'ie')
    };

    typecheck(checkBrowser, params, arguments);
}

checkBrowser('safari');
// error: "checkBrowser(browser) browser expected a Browser: "chrome", "firefox" or "ie" but received.."

checkBrowser('firefox');
// success
```

We don't have to pass in 3 arguments to our user-defined `Types.browser`, we can just pass in one argument:

```js
function checkBrowser(browser) {
    const params = {
        browser: Types.browser('chrome')
    };

    typecheck(checkAny, params, arguments);
}

checkBrowser('firefox');
// error: "checkBrowser(browser) browser expected a Browser: "chrome", or but received..."
```

Pay attention that the error message looks a bit silly because we didn't pass in `{b}` and `{c}`.

Do not define `{a}`... in the singular/plural options and it will figure out how to display the arguments automatically:

```js
// error: "checkBrowser(browser) browser expected a Browser: "chrome" but received..."
```

Prevent displaying the arguments, by also setting option **`autoDisplayArgs`** to false:

```js
// error: "checkBrowser(browser) browser expected a Browser but received..."
```

## Typecheck

Throws an `Error` when data fails to meet params configuration, ensuring data quality, i.e. data is both correct and useful.

There are 4 ways of invoking `typecheck`:

#### 1. Class methods

```js
typecheck(object, method, params, arguments);
```

**Where:**

-   `object`
    -   **Object** instance of a class;
    -   or **Function** the class itself (for static methods);
    -   or **String** name of the class.
-   `method`
    -   **Function** method of a class;
    -   or **String** name of the method.
-   `params`
    -   **Object** built with **Types**.
-   `arguments`
    -   **Array** data to be validated.
    -   or **Object** data to be validated.

**Example:**

```js
class Account {
    saveAccount() {
        typecheck(this, this.saveAccount, params, arguments);
    }
    editAccount() {
        typecheck('Account', 'editAccount', params, arguments);
    }
    static deleteAccount() {
        typecheck(Account, 'deleteAccount', params, arguments);
    }
}
```

#### 2. Class constructor

Here, `method` is omitted because it assumes to be the class constructor:

```js
typecheck(object, params, arguments);
```

**Where:**

-   `object`
    -   **Object** instance of a class;
    -   or **String** name of the class.
-   `params`
    -   **Object** built with **Types**.
-   `arguments`
    -   **Array** data to be validated.
    -   or **Object** data to be validated.

**Examples:**

```js
class Account {
    constructor() {
        typecheck(this, params, arguments);
    }
}
```

```js
class Account {
    constructor() {
        typecheck('Account', params, arguments);
    }
}
```

#### 3. Stand-alone Function

Here, `object` is omitted because there is no class or object, it's a stand-alone function:

```js
typecheck(func, params, arguments);
```

**Where:**

-   `func`
    -   **Function** function;
    -   or **String** name of the function.
-   `params`
    -   **Object** built with **Types**.
-   `arguments`
    -   **Array** data to be validated;
    -   or **Object** data to be validated.

**Examples:**

```js
function saveAccount() {
    typecheck(saveAccount, params, arguments);
}
```

```js
function saveAccount() {
    typecheck('saveAccount', params, arguments);
}
```

#### 4. Stand-alone data

Here there is no object or function:

```js
typecheck(params, data);
```

**Where:**

-   `params`
    -   **Object** built with **Types**.
-   `data`
    -   **Array** data to be validated;
    -   or **Object** data to be validated.

**Examples:**

```js
const params = {
    name: Types.string,
    isActive: Types.boolean
};
const data = ['name', true];

typecheck(params, data);
```

```js
const params = {
    name: Types.string,
    isActive: Types.boolean
};
const data = {
    name: 'name',
    isActive: true
};

typecheck(params, data);
```

### Obfuscated class/function names

If the class/function name is mangled as a result of `UglifyJS`, there are 4 ways to fix it:

#### 1. Re-write the native class static name property

_Beware: this is NOT going to work on old versions of Safari (webkit)_

```js
class Account {
    static get name() {
        return 'Account';
    }
    constructor() {
        // ...
        typecheck(this, params, arguments);
    }
}
```

#### 2. Pass a string to represent the class/function

Class constructor:

```js
typecheck('Class', params, arguments);
```

Class method:

```js
typecheck('Class', 'method', params, arguments);
```

Function:

```js
typecheck('function', params, arguments);
```

#### 3. Override toString method

The distinction between using `toString` and `name` is that `toString` represents the class instance (Object) while `name` represents the class definition.
So `toString` has the advantage of being able to differentiate itself from several class instances.

TypeChecking has an order of priority that is used to construct the error message. This order can be re-defined in the [Config](#configuration).

```js
// Config name method priority must be set to toString
Config.nameMethodPriority = Config.NameMethod.toString;

class Account {
    constructor() {
        // ...
        typecheck(this, params, arguments);
    }
    toString() {
        return 'Account';
    }
}
```

#### 4. Update keep_fnames

A [minify option](https://github.com/mishoo/UglifyJS#minify-options) of `UglifyJS` to prevent discarding or mangling of function names, i.e. class names.

### Arguments

There are 3 ways of passing data to `typecheck`:

#### 1. As the arguments object

The [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) works the same way as the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).

The difference is that the variables are declared **before** invoking `typecheck`:

```js
function createAccount(name, isActive = false) {
    const params = {
        name: Types.string,
        isActive: Types.boolean.optional
    };

    typecheck(createAccount, params, arguments);
}
```

#### 2. As the rest parameter

With the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters), the variables are declared **after** invoking `typecheck`:

```js
function createAccount(...args) {
    const params = {
        name: Types.string,
        isActive: Types.boolean.optional
    };

    typecheck(createAccount, params, args);

    const [name, isActive = false] = args;
}
```

#### 3. As an Object

Passing an Object also works:

```js
function createAccount(name, isActive = false) {
    const params = {
        name: Types.string,
        isActive: Types.boolean.optional
    };

    typecheck(createAccount, params, { name, isActive });
}
```

```js
function createAccount(options) {
    const params = {
        options: Types.object({
            name: Types.string,
            isActive: Types.boolean.optional
        })
    };

    typecheck(createAccount, params, { options });
}
```

## Typecheck.atLeastOne

Throws an `Error` when data fails to meet params configuration or no argument is provided, i.e. data is either **null** or **undefined**.

```js
import { Types, typecheck } from '@fab1o/type-checking';

typecheck.atLeastOne([object], [func], params, arguments);
```

**Example:**

```js
function addAccount(name = '', isActive = false) {
    const params = {
        name: Types.string.optional,
        isActive: Types.boolean.optional
    };

    typecheck.atLeastOne(addAccount, params, arguments);
}

addAccount();
// error: addAccount(name, isActive) at least one parameter must be provided.
```

Using `typecheck` will not throw an error because all parameters are optional. That is why we use `typecheck.atLeastOne`.

## Custom Validation

If you can't find something useful in `Types`, you can always create your own with [User-defined Types](#user-defined-types). Or use:

```js
Types.custom(validator, [errorMessage], [...args]);
```

**Where:**

-   `validator` - **Function**: `function(value: any, input: Array|Object, [...args]: Array): Boolean;`
    -   `value` - the data being validated for a param using this type.
    -   `input` - all the data (user input) given to typecheck. Helpful for comparison between different param values.
    -   `args` - optional **Array** of the extra arguments provided by you to the type.
-   `errorMessage` - optional **String** of what is expected from this type.
-   `args` - optional extra arguments.

**Example:**

A function that throws an Error if the given value is not a prime Number and, as an example of how we can use extra arguments, between 1 and 100 (passed as arguments to the type).

```js
function isPrime(num) {
    function validator(value, input, ...args) {
        if (value <= 1) {
            return false;
        }
        for (let i = 2; i < value; i++) {
            if (value % i === 0 && value > 10) {
                return false;
            }
        }

        // example of how we can use extra arguments
        const min = args[0];
        const max = args[1];

        if (value > min && value < max) {
            return true;
        }

        return false;
    }

    const params = {
        num: Types.custom(validator, 'a prime Number', 1, 100)
    };

    typecheck(isPrime, params, arguments);
}

isPrime(66);
// error: "isPrime(num) num expected a prime Number but received a Number: 66."
```

## Best Practices

-   The order of parameters must be the same order of arguments given by user input. Unless you do [Named Arguments](#named-arguments).
-   It's important that `params` object mirrors the parameters in the function: Same name, same order, same expected type.
-   Keep optional and undefinable parameters in the end. Unless you do _Named Arguments_ or _Overloading_.
-   Make sure class and function names are defined correctly. See [Obfuscated class/function names](#obfuscated-classfunction-names).
