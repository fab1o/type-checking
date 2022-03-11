<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Typecheck](#typecheck)
    -   [Syntax](#syntax)
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
-   [Migrating from Check-types](#migrating-from-check-types)
    -   [Important notes](#important-notes)
-   [Configuration](#configuration)
    -   [Configuration options](#configuration-options)
-   [Types](#types)
    -   [Array of Types](#array-of-types)
    -   [Non-empty Array of Types](#non-empty-array-of-types)
    -   [Type.or.type Types](#typeortype-types)
    -   [Type.and.type Types](#typeandtype-types)
    -   [Nullable Types](#nullable-types)
    -   [Undefinable Types](#undefinable-types)
    -   [Optional Types](#optional-types)
    -   [Logging Types](#logging-types)
        -   [Logging but not type-checking](#logging-but-not-type-checking)
-   [Named Arguments](#named-arguments)
    -   [Advantages of Named Arguments](#advantages-of-named-arguments)
-   [Validate Params](#validate-params)
-   [Extend Params](#extend-params)
-   [User-defined Types](#user-defined-types)
    -   [Example of a user-defined type that receives no arguments](#example-of-a-user-defined-type-that-receives-no-arguments)
    -   [Example of a user-defined type that receives arguments](#example-of-a-user-defined-type-that-receives-arguments)
-   [Typecheck.atLeastOne](#typecheckatleastone)
-   [Typecheck.warn](#typecheckwarn)
-   [Custom Validation](#custom-validation)
-   [Best Practices](#best-practices)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Typecheck

Throws an `Error` when data fails to meet params configuration, ensuring data quality, i.e. data is both correct and useful.

### Syntax

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
    -   **Object** built with **Types**
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
    -   **Object** instance of a class
    -   or **String** name of the class
-   `params`
    -   **Object** built with **Types**
-   `arguments`
    -   **Array** data to be validated
    -   or **Object** data to be validated

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
    -   **Object** built with **Types**
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
    -   **Object** built with **Types**
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

TypeChecking has an order of priority that is used to construct the error message. This order can be re-defined via [Config](#configuration).

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

## Migrating from Check-types

[Check-types.js](https://github.bamtech.co/fed-packages/check-types) is included in `@fab1o/type-checking`.

Steps for migration:

1. Run `npm uninstall check-types`
2. Run `npm install @fab1o/type-checking`
3. Re-write your imports:

```js
import { Check } from '@fab1o/type-checking'; // same as: import Check from 'check-types';

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

Throws `TypeError` when a configuration option is invalid.

### Configuration options

| Option                | Type                                                                                                | Implemented | Default                                                                                                   | Description                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ErrorType             | [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)     | Yes         | [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) | Error type.                                                                                   |
| logger                | [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)   | Yes         | **null**                                                                                                  | Logger object.                                                                                |
| etceteraOn            | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | No          | `true`                                                                                                    | If ", ... " part in the parameters list is shown.                                             |
| parentsOn             | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | No          | `true`                                                                                                    | If the param's parent name is in the error message.                                           |
| displayParamExt       | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | No          | `true`                                                                                                    | If error message informs user it accepts null or undefined.                                   |
| expectedMessage       | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)   | No          | `'expected'`                                                                                              | "expected..." error message part.                                                             |
| receivedMessage       | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)   | No          | `'but received'`                                                                                          | "but received..." error message part.                                                         |
| nameMethodPriority    | `Config.NameMethod`                                                                                 | No          | `'name'`                                                                                                  | "but received..." error message part.                                                         |
| loggerMethodForOrType | `Config.LoggerMethod` or `null`                                                                     | No          | `Config.LoggerMethod.warn`                                                                                | The logger method used to log failures for the type.or.type. Set it to `null` to turn it off. |

| Config.NameMethod | value        | Description                                                                                                                      |
| ----------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| name              | `'name'`     | Function's property **[name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)**   |
| toString          | `'toString'` | Object's method **[toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)** |

**Example:**

```js
import { Config } from '@fab1o/type-checking';

class MyCustomError extends Error {}

Config.setup({
    ErrorType: MyCustomError
});

// resets all configuration to default
Config.reset();
```

## Types

Types allow you to define a data type for a parameter in which validation will occur, except `Types.skip` which will not validate data.

If data doesn't meet the Type description, a error will be thrown.

| Type name                         | Type description                                                                                                                   | Implemented |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `Types.array`                     | data is an Array                                                                                                                   | Yes         |
| `Types.arrayBufferView`           | data is an [ArrayBuffer view](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/isView) | Yes         |
| `Types.arrayLike`                 | data is an Array-like                                                                                                              | No          |
| `Types.assigned`                  | data is not **null** or **undefined**                                                                                              | Yes         |
| `Types.between(a, b)`             | data is a Number between `a` and `b`                                                                                               | No          |
| `Types.boolean`                   | data is a Boolean                                                                                                                  | Yes         |
| `Types.custom(a, [b], [...args])` | data is validated by `a` Function and `b` is an optional String. [More info](#custom-validation)                                   | Yes         |
| `Types.date`                      | data is a Date                                                                                                                     | Yes         |
| `Types.dateString`                | data is a String in ISO datetime format                                                                                            | Yes         |
| `Types.emptyArray`                | data is an empty Array                                                                                                             | No          |
| `Types.emptyObject`               | data is an empty Object                                                                                                            | No          |
| `Types.emptyString`               | data is an empty String                                                                                                            | No          |
| `Types.equal(a)`                  | data is === `a`                                                                                                                    | No          |
| `Types.even`                      | data is an even Number                                                                                                             | No          |
| `Types.float`                     | data is a float Number                                                                                                             | No          |
| `Types.function`                  | data is a Function                                                                                                                 | Yes         |
| `Types.greater(a)`                | data is a Number greater than `a`                                                                                                  | No          |
| `Types.greaterOrEqual(a)`         | data is a Number greater or equal to `a`                                                                                           | Yes         |
| `Types.hasLength(a)`              | data has length of `a` (for strings and arrays)                                                                                    | No          |
| `Types.in(a)`                     | data is a value in `a` Array/Object                                                                                                | No          |
| `Types.inheritance(a)`            | data is a type that inherits from `a` type                                                                                         | No          |
| `Types.inRange(a, b)`             | data is a Number in the range `a` to `b`                                                                                           | No          |
| `Types.instance(a)`               | data is an instance of `a` or data.name is `a`.name or its toString is "[object a]"                                                | No          |
| `Types.instanceStrict(a)`         | data is an instance of `a`                                                                                                         | Yes         |
| `Types.integer`                   | data is an integer                                                                                                                 | Yes         |
| `Types.iterable`                  | data is an iterable object                                                                                                         | No          |
| `Types.keyIn(a)`                  | data is a key in `a` Array/Object                                                                                                  | Yes         |
| `Types.less(a)`                   | data is a Number lower than `a`                                                                                                    | No          |
| `Types.lessOrEqual(a)`            | data is a Number lower or equal to `a`                                                                                             | No          |
| `Types.like(a)`                   | data is an Object that is like `a` Object                                                                                          | Yes         |
| `Types.match(a)`                  | data is a String that matches `a` regular expression                                                                               | No          |
| `Types.nan`                       | data is NaN (not a number)                                                                                                         | No          |
| `Types.negative`                  | data is a Number lower than zero                                                                                                   | No          |
| `Types.nonEmptyArray`             | data is a non-empty Array                                                                                                          | No          |
| `Types.nonEmptyObject`            | data is a non-empty Object                                                                                                         | Yes         |
| `Types.nonEmptyString`            | data is a non-empty String                                                                                                         | Yes         |
| `Types.null`                      | data is **null**                                                                                                                   | No          |
| `Types.number`                    | data is a Number                                                                                                                   | Yes         |
| `Types.object([a])`               | data is an Object that is like `a` Object built with **Types**                                                                     | Yes         |
| `Types.odd`                       | data is an odd Number                                                                                                              | No          |
| `Types.positive`                  | data is a Number greater than zero                                                                                                 | Yes         |
| `Types.skip`                      | data is ignored (typecheck is not performed)                                                                                       | Yes         |
| `Types.string`                    | data is a String                                                                                                                   | Yes         |
| `Types.thenable`                  | data is a Promise                                                                                                                  | No          |
| `Types.undefined`                 | data is **undefined**                                                                                                              | No          |

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

| Type                         | Description                                            |
| ---------------------------- | ------------------------------------------------------ |
| `Types.array.of.string`      | data is an Array of strings or an empty Array          |
| `Types.array.of.instance(a)` | data is an Array of instances of `a` or an empty Array |

etc...

To not allow an empty Array, use the following:

### Non-empty Array of Types

_This feature is not implemented._

User is required to provide an array of a type and Array cannot be empty.

| Type                                 | Description                                                  |
| ------------------------------------ | ------------------------------------------------------------ |
| `Types.nonEmptyArray.of.string`      | data is an Array of strings with at least 1 element          |
| `Types.nonEmptyArray.of.instance(a)` | data is an Array of instances of `a` with at least 1 element |

etc...

### Type.or.type Types

_This feature is not implemented._

Combination of 2 types allow you to define two data types for a parameter in which any type validation must succeed.

| Type                                      | Description                                                           |
| ----------------------------------------- | --------------------------------------------------------------------- |
| `Types.arrayBufferView.or.nonEmptyString` | data is an ArrayBuffer view or a non-empty String                     |
| `Types.in(a).or.string`                   | data is a value in `a` Array/Object or a String                       |
| `Types.in(a).or.nonEmptyString`           | data is a value in `a` Array/Object or a non-empty String             |
| `Types.array.of.in(a).or.array.of.string` | data is an Array of values in `a` Array/Object or an Array of strings |

etc...

The other way around also works:

| Type                                      | Description                                                           |
| ----------------------------------------- | --------------------------------------------------------------------- |
| `Types.nonEmptyString.or.arrayBufferView` | data is a non-empty String or is an ArrayBuffer view                  |
| `Types.string.or.in(a)`                   | data is a String or a value in `a` Array/Object                       |
| `Types.nonEmptyString.or.in(a)`           | data is a non-empty String or a value in `a` Array/Object             |
| `Types.array.of.string.or.array.of.in(a)` | data is an Array of strings or an Array of values in `a` Array/Object |

etc...

If data validation fails for the first type, it will try to validate the second type. It only throws an Error if both validation fails.

A log message is generated when the first data type fails to validate. Use `Config.loggerMethodForOrType` to set logger method. Set it to `null` to turn it off.

### Type.and.type Types

_This feature is not implemented._

Combination of 2 types allow you to define two data types for a parameter in which both type validations must succeed.

| Type                                       | Description                            |
| ------------------------------------------ | -------------------------------------- |
| `Types.string.and.hasLength(a)`            | data is a String and has length of `a` |
| `Types.integer.and.positive`               | data is an integer greater than 0      |
| `Types.even.and.integer`                   | data is an even integer                |
| `Types.array.of.even.and.array.of.integer` | data is an Array of an even integer    |

etc...

The other way around also works:

| Type                                       | Description                            |
| ------------------------------------------ | -------------------------------------- |
| `Types.hasLength(a).and.string`            | data is a String and has length of `a` |
| `Types.positive.and.integer`               | data is an integer greater than 0      |
| `Types.integer.and.even`                   | data is an even integer                |
| `Types.array.of.integer.and.array.of.even` | data is an Array of an even integer    |

etc...

Both types must validate correctly. It throws an Error if one of two validation fails.

### Nullable Types

_This feature is not implemented._

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

All types can be nullable including type.and.type and type.or.type, except `Types.skip`.

### Undefinable Types

_This feature is not implemented._

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

All types can be undefinable including type.and.type and type.or.type, except `Types.skip`.

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

All types can be optional including type.and.type and type.or.type, except `Types.skip`.

It's best to keep optional and undefinable parameters in the end of the parameter list in order for users to easily omit arguments for those parameters.

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

### Logging Types

All type are loggable. Logging types are types that perform validation but log the error message instead of throwing an Error.

In the example below, the param `name` acts the same way as `Types.string` but with the `log` extension, it will not throw an error.

Instead, the error message will be logged via an internal `logger` object that is set via [Config](#configuration), in which the default logger is the [**console**](https://developer.mozilla.org/en-US/docs/Web/API/console).

```js
function setName(name) {
    const params = {
        name: Types.string.warn
    };

    typecheck(setName, params, arguments);
}
```

You can use the following types to log messages instead of throwing an Error:

-   `Types.string.warn`

_This following features are not implemented:_

-   `Types.string.log`
-   `Types.string.info`
-   `Types.string.error`

To set the `logger` object, use the [Config](#Configuration).

#### Logging but not type-checking

Use **`Types.skip.warn`** to log when a type-check is not performed for a parameter.

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
// error: "addAccount(options) options expected an Object but received undefined."

createAccount({});
// error: "addAccount({id, name}) options.id expected a Number but received undefined."
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

## Validate Params

_This feature is not implemented._

Validates params object setup.

```js
import { validateParams } from '@fab1o/type-checking';

validateParams(params);
```

**Where:**

-   `params` - **Object** built with **Types**

Returns **Boolean** Whether params is an object built with Types.

## Extend Params

_This feature is not implemented._

Allows a params object built with Types to extend multiple params object, similar to Class-based inheritance.

```js
import { extendParams } from '@fab1o/type-checking';

extendParams(params, [params], [params], [params], [params], [params], [params]);
```

**Where:**

-   `params` - **Object** built with **Types**

Throws `TypeError` when params is not an object built with Types.

**Example:**

```js
import { Types, typecheck, extendParams } from '@fab1o/type-checking';

const params = extendParams(
    {
        name: Types.string
    },
    {
        score: Types.number
    }
);

typecheck(params, {});
// error: "{name, score} name expected a String but received undefined."

const data = {
    name: 'Fabio',
    score: 10
};

typecheck(params, data);
// success
```

## User-defined Types

_This feature is not implemented._

An user-defined type is an alternative to `Types.custom` for a custom type that is more commonly used.

An user-defined type is also available in `Types`, just like any other native type.

There are two kinds of types:

-   Types that receive no arguments - i.e.: `Types.string`
-   Types that receive arguments - i.e.: `Types.between(a, b)` receives 2 arguments

To create an user-defined type, use the helper **addType** function:

```js
import { addType } from '@fab1o/type-checking';

addType(name, validator, [options]);
```

**Where:**

-   `name` - **String** is the name of the type.
-   `validator` - **Function**: `function(value: *, [...args]: Array): boolean;`
    -   `value` - the data being validated for a param using this type.
    -   `userArguments` - optional: **Array/Object** all the user data (the `arguments` argument of the typecheck call)
    -   `...args` - optional: **Array** of the extra arguments provided by you to the type.
-   `options` - optional: **Object** with:
    -   `singular` - optional: **String**. Default: `name`.
    -   `plural` - optional: **String**. Default: `name + "s"`.
    -   `expectArgs` - optional: **Boolean**. Default: `false`. Whether or not type receive arguments.
    -   `autoDisplayArgs` - optional: **Boolean**. Default: `true`. Whether or not automatically display arguments.
    -   `stringifyArgs` - optional: **Function** to stringify the expected arguments of the type, in case there is one.

Throws `TypeError` when a parameter is invalid.

### Example of a user-defined type that receives no arguments

Let's create a type `berry` that converts the user value into a String and checks if it contains the word "berry".

```js
import { Types, typecheck, addType } from '@fab1o/type-checking';

const customValidator_isBerry = (value) => {
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

const customValidator_isBrowser = (value, ...args) => {
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

## Typecheck.atLeastOne

Throws an Error when data fails to meet params configuration or no argument is provided, i.e. data is either **null** or **undefined**.

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

## Typecheck.warn

Logs error messages for all params/types instead of throwing an Error when data fails to meet params configuration.

Uses an internal `logger` object that is set via [Config](#configuration), in which the default logger is the [**console**](https://developer.mozilla.org/en-US/docs/Web/API/console).

```js
import { Types, typecheck } from '@fab1o/type-checking';

typecheck.warn([object], [func], params, arguments);
```

**Example:**

```js
function addAccount(name) {
    const params = {
        name: Types.string
    };

    typecheck.warn(addAccount, params, arguments);
}

addAccount(null);
// does not throw an Error
// logs message: addAccount(name) name expected a String but received null.
```

You can use the following types of logging:

-   `typecheck.warn()`

_This following features are not implemented:_

-   `typecheck.log()`
-   `typecheck.info()`
-   `typecheck.error()`

## Custom Validation

If you can't find something useful in `Types`, you can always create your own with [User-defined Types](#user-defined-types). Or use:

```js
Types.custom(validator, [errorMessage], [...args]);
```

**Where:**

-   `validator` - **Function**: `function(value: any, [...args]: Array): Boolean;`
    -   `value` - the data being validated for a param using this type.
    -   `userArguments` - optional: **Array/Object** all the user data (the `arguments` argument of the typecheck call)
    -   `...args` - optional: **Array** of the extra arguments provided by you to the type.
-   `errorMessage` - optional: **String** of what is expected from this type.
-   `...args` - optional: extra arguments to provide to the `validator` function.

**Example:**

A function that validates if the given value is a prime Number.

```js
function isPrime(num) {
    function validator(value) {
        if (value <= 1) {
            return false;
        }

        const sq = Math.sqrt(value);

        for (let i = 2; i < sq; i++) {
            if (value % i === 0) {
                return false;
            }
        }

        return true;
    }

    const params = {
        num: Types.custom(validator, 'a prime Number')
    };

    typecheck(isPrime, params, arguments);
}

isPrime(6);
// error: "isPrime(num) num expected a prime Number but received a Number: 6."

isPrime(7);
// success: 7 is a prime number
```

**Example using extra args:**

A function that validates if the given value is a prime Number and between two numbers: 1 and 6.

```js
function isPrime(num) {
    function validator(value, userArguments, min, max) {
        if (value <= 1) {
            return false;
        }

        const sq = Math.sqrt(value);

        for (let i = 2; i < sq; i++) {
            if (value % i === 0) {
                return false;
            }
        }

        if (value < min || value > max) {
            return false;
        }

        return true;
    }

    const params = {
        num: Types.custom(validator, 'a prime Number and between 1 and 6', 1, 6)
    };

    typecheck(isPrime, params, arguments);
}

isPrime(7);
// error: "isPrime(num) num expected a prime Number and between 1 and 6 but received a Number: 7."

isPrime(3);
// success
```

**Example using user arguments**

A function that validates if the given value is a prime Number and between two numbers that are given.

```js
function isPrime(num) {
    function validator(value, userArguments) {
        if (value <= 1) {
            return false;
        }

        const sq = Math.sqrt(value);

        for (let i = 2; i < sq; i++) {
            if (value % i === 0) {
                return false;
            }
        }

        const min = userArguments[1]; // index is 1 cos min is the second argument
        const max = userArguments[2]; // index is 2 cos max is the third argument

        if (value < min || value > max) {
            return false;
        }

        return true;
    }

    const params = {
        num: Types.custom(validator, 'a prime Number between min and max'),
        min: Types.number,
        max: Types.number
    };

    typecheck(isPrime, params, arguments);
}

isPrime(7, 1, 6);
// error: "isPrime(num, min, max) num expected a prime Number between min and max but received a Number: 7."

isPrime(7, 1, 8);
// success
```

**Example using user arguments with object param**

A function that validates if the given value is a prime Number and between two numbers that are given.

```js
function isPrime(num) {
    function validator(value, userArguments) {
        if (value <= 1) {
            return false;
        }

        const sq = Math.sqrt(value);

        for (let i = 2; i < sq; i++) {
            if (value % i === 0) {
                return false;
            }
        }

        const opts = userArguments[0]; // index is 0 cos opts is the first argument

        const { min, max } = opts;

        if (value < min || value > max) {
            return false;
        }

        return true;
    }

    const params = {
        opts: Types.object({
            num: Types.custom(validator, 'a prime Number between min and max'),
            min: Types.number,
            max: Types.number
        })
    };

    typecheck(isPrime, params, arguments);
}

isPrime({ num: 7, min: 1, max: 6 });
// error: "isPrime({num, min, max}) opts.num expected a prime Number between min and max but received a Number: 7."

isPrime({ num: 7, min: 1, max: 8 });
// success
```

## Best Practices

-   It's important that `params` object mirrors the parameters in the function: Same name, same order, same expected type.
-   Keep optional and undefinable parameters in the end. Unless you do [Named Arguments](#named-arguments) or _Overloading_.
-   Make sure class and function names are defined correctly. See [Obfuscated class/function names](#obfuscated-classfunction-names).
