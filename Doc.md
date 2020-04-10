# Type Checking Guide

-   [Types](#types)
    -   [Required Types](#required-types)
    -   [Optional Types](#optional-types)
    -   [Nullable Types](#nullable-types)
    -   [Nullable and Optional Types](#nullable-and-optional-types)
    -   [Array of Types](#array-of-types)
-   [Example](#example)
    -   [Options](#options)
-   [Configuration](#configuration)
-   [Typecheck](#typecheck)
    -   [Simple Examples](#simple-examples)
    -   [Typecheck anything](#typecheck-anything)
    -   [Typecheck a stand-alone function](#typecheck-a-stand-alone-function)
    -   [Typecheck the constructor of an instance of a class](#typecheck-the-constructor-of-an-instance-of-a-class)
    -   [Typecheck a method of an instance of a class](#typecheck-a-method-of-an-instance-of-a-class)
-   [Input](#input)
    -   [Using the JavaScript arguments object](#using-the-javascript-arguments-object)
-   [Examples](#examples)
    -   [Instance method](#instance-method)
    -   [Class constructor](#class-constructor)
    -   [Object method](#object-method)
        -   [Naming the object](#naming-the-object)
-   [Custom validation](#custom-validation)
    -   [Example of custom validation](#example-of-custom-validation)
-   [Best Practices](#best-practices)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Types

### Required Types

Typecheck input data that is defined and undefined (for required parameters).

-   `Types.array` - where input is an Array.
-   `Types.between(x, y)` - where input is a Number between `x` and `y`.
-   `Types.boolean` - where input is a Boolean.
-   `Types.custom(x, y)` - where `x` is a Function that returns Boolean and `y` is a String. [More info](#custom-validation).
-   `Types.date` - where input is a Date.
-   `Types.even` - where input is an even Number.
-   `Types.float` - where input is a float Number.
-   `Types.function` - where input is a Function.
-   `Types.greater(x)` - where input is a Number greater than `x`.
-   `Types.greaterOrEqual(x)` - where input is a Number greater or equal to `x`.
-   `Types.in(x)` - where input is in `x` array/object.
-   `Types.inRange(x, y)` - where input is a Number in the range `x` to `y`.
-   `Types.instance(x)` - where input is an instance of `x`.
-   `Types.instanceStrict(x)` - where input is an instance strict of `x`.
-   `Types.integer` - where input is an integer.
-   `Types.keyIn(x)` - where input is a key in `x` Array/Object.
-   `Types.less(x)` - where input is a Number less than `x`.
-   `Types.lessOrEqual(x)` - where input is a Number less or equal to `x`.
-   `Types.like(x)` - where input is an Object and has all of the properties of `x` Object.
-   `Types.nonEmptyArray` where input is a non-empty Array.
-   `Types.nonEmptyObject` where input is a non-empty Object.
-   `Types.nonEmptyString` where input is a non-empty String.
-   `Types.match(x)` - where input is a String that matches `x` Regular expression.
-   `Types.negative` - where input is a Number lower than 0.
-   `Types.null` - where input is null.
-   `Types.number` - where input is a Number.
-   `Types.object([x])` - where `x` is an optional Object built with Types. [More info](#options).
-   `Types.odd` - where input is an odd Number.
-   `Types.positive` - where input is a Number greater than 0.
-   `Types.string` - where input is a String.
-   `Types.thenable` - where input is a Promise.

### Optional Types

Only typecheck input data that is defined (for optional parameters).

-   `Types.number.optional` - where input is an optional Number.
-   ...
-   ..

### Nullable Types

Only typecheck input data that is defined or null (for nullable parameters).

-   `Types.nullable.boolean` - where input is a nullable Boolean.
-   ...
-   ..

### Nullable and Optional Types

Only typecheck input data that is defined or null (for nullable parameters).

-   `Types.nullable.string.optional` - where input is a nullable and optional String.
-   ...
-   ..

#### Array of Types

Typecheck input data that is an Array of something. All `Types.array.of` follow the same structure above.

-   `Types.array.of.object` - where input is an Array of objects.
-   ...
-   ..

## Example

```js
import { Types, typecheck } from '@fab1o/type-checking';

const params = {
    id: Types.number,
    name: Types.nonEmptyString,
    marks: Types.array.of.string,
    isActive: Types.boolean.optional
};
```

Where parameter:

-   `id` expected a number.
-   `name` expected an non-empty string.
-   `marks` expected an array of strings.
-   `isActive` expected an optional boolean.
    <br>

Note: `.optional` can be used with any available type including "array of something" types.

### Options

When working with _"options"_ as a parameter, you must use the object type `Types.object` and pass in more `Types`:

```js
function createStudent(options) {
    const params = {
        options: Types.object({
            id: Types.number,
            name: Types.string,
            dob: Types.date
        })
    };

    typecheck(createStudent, params, arguments);

    const { id, name, dob } = options;
}
```

## Configuration

```js
import { Config } from '@fab1o/type-checking';

Config.setup(options);
```

#### Options

| option             | type                                                                                                | default                                                                                                       | desc                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| errorType          | [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)     | [`SyntaxError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) | Error type.                                              |
| etceteraOn         | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | `true`                                                                                                        | If ", ... " part in the parameters list is shown.        |
| parentsOn          | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | `true`                                                                                                        | If the param's parent name is in the error message.      |
| optionalBracketsOn | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | `true`                                                                                                        | If message includes square brackets for optional params. |
| expectedMessage    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)   | `'expected'`                                                                                                  | "expected..." error message part.                        |
| receivedMessage    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)   | `'but received'`                                                                                              | "but received..." error message part.                    |
| withPropsMessage   | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)   | `'with properties'`                                                                                           | "with properties..." error message part.                 |

Example:

```js
class MyCustomError extends Error {}

Config.setup({
    errorType: MyCustomError
});
```

## Typecheck

Validates arguments against parameters. Throws an Error when user input data fails to meet params configuration.

```js
import { Types, typecheck } from '@fab1o/type-checking';

typecheck([object], [func], params, arguments);
```

Where:

-   `object` is the instance of a class or the object of a method call (Optional: undefined by default).
-   `func` is the function or method of an object (Optional: undefined or class constructor by default).
-   `params` is an object built with [Types](#types).
-   `arguments` the user's input values.

<br>

### Simple Examples

Using the JavaScript [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) object:

```js
function createStudent(name, isActive = false) {
    const params = {
        name: Types.string,
        isActive: Types.boolean.optional
    };

    typecheck(createStudent, params, arguments);
}
```

```js
function createStudent(options) {
    const params = {
        options: Types.object({
            name: Types.string,
            isActive: Types.boolean.optional
        })
    };

    typecheck(createStudent, params, arguments);

    const { name, isActive = false } = options;
}
```

Using the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters):

```js
function createStudent(...args) {
    const params = {
        name: Types.string,
        isActive: Types.boolean.optional
    };

    typecheck(createStudent, params, args);

    const [name, isActive = false] = args;
}
```

### Typecheck anything

A set of `params` against user input data (arguments). See [Using the JavaScript arguments object](#using-the-javascript-arguments-object).

```js
typecheck(params, arguments);
```

If there are 3 parameters, the error message will start as:
`'{param1, param2, param3} param1 expected...'`

### Typecheck a stand-alone function

Passing the function to `typecheck`, allows it to describe the error message differently.

```js
typecheck(func, params, arguments);
```

The error message will start as:
`'func(param1, param2, param3, ...) param1 expected...'`

### Typecheck the constructor of an instance of a class

Passing the object to `typecheck`, allows it to describe the error message with more details.

```js
typecheck(object, params, arguments);
```

The error message will start as:
`'object(param1, param2, param3, ...) param1 expected...'`

See an [example](#class-constructor).

### Typecheck a method of an instance of a class

Passing the object and object's method to `typecheck`, allows it to describe a complete error message.

```js
typecheck(object, method, params, arguments);
```

The error message will start as:
`'object.method(param1, param2, param3, ...) param1 expected...'`

## Input

```js
typecheck(params, arguments);
```

### Using the JavaScript arguments object

The best way to invoke `typecheck` is to pass in the JavaScript [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) object.
It works the same way as the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
The difference is that the variables are declared **before** invoking `typecheck`.

```js
function createStudent(name, isActive = false) {
    const params = {
        name: Types.string,
        isActive: Types.boolean.optional
    };

    typecheck(createStudent, params, arguments);
}
```

```js
function createStudent(options) {
    const params = {
        options: Types.object({
            name: Types.string,
            isActive: Types.boolean.optional
        })
    };

    typecheck(createStudent, params, arguments);

    const { name, isActive } = options;
}
```

## Examples

### Instance method

Validating a method of an instance of a class.

```js
class Student {
    create(firstName, teacher, isActive = true) {
        const params = {
            firstName: Types.string,
            teacher: Types.instanceStrict(Teacher),
            isActive: Types.boolean.optional
        };

        typecheck(this, this.create, params, arguments);
    }
}
```

Note: The order of params's properties must follow the order of parameters. It's a good practice is keep optional parameters in the end.

### Class constructor

Validating a constructor.

```js
class Student {
    constructor(options) {
        const params = {
            id: Types.number,
            firstName: Types.nonEmptyString,
            lastName: Types.string
        };

        typecheck(this, params, arguments);
    }
}
```

Note: The difference between validating a constructor and a method is that we do not need to pass the `constructor` to be validated because it is by default.

### Object method

Validating an object's method.

```js
const student = {
    create: function create(firstName) {
        const params = {
            firstName: Types.string
        };

        typecheck(this.create, params, arguments);
    }
};
```

Invoking the method below, should result in an Error.

```js
student.create(null);
```

The error message will be:
`'create(firstName) firstName expected a String but received null'`

#### Naming the object

For the error message to display your desired object name, you need to overwrite the `toString` method of the object and pass the object to the `typecheck` function.

```js
class Student {

    static create(firstName) {

        const params = {
            firstName: Types.string
        };

        typecheck(this, this.create, params, arguments);
    },

    toString() {
        return 'Student';
    }

}
```

Invoking the method below, should result in an Error.

```js
Student.create();
```

The error message will now be:
`'Student.create(firstName) firstName expected a String but received undefined'`

## Custom validation

```js
Types.custom(customValidator, [errorMessage]);
```

Where:

-   `customValidator` is a Function that returns boolean.
-   `errorMessage` is an optional String that represents what is expected from this type.

### Example of custom validation

A function that throws an Error if the given value is not a prime Number.

```js
function isPrime(value) {
    function validator(x) {
        if (x <= 1) {
            return false;
        }
        for (let i = 2; i < x; i++) {
            if (x % i === 0) {
                return false;
            }
        }
        return true;
    }

    const params = {
        value: Types.custom(validator, 'a prime Number')
    };

    typecheck(isPrime, params, arguments);
}
```

Invoking the method below, should result in an Error.

```js
isPrime(66);
```

The error message will be:
`'isPrime(value) value expected a prime Number but received a Number: 66'`

## Best Practices

-   Create the `params` object in the same order as the function parameters.
-   Keep optional parameters in the end.
-   The order of parameters must follow the order of arguments (user input).
-   Overwrite the object's `toString()` to describe what the object is. If not, the error message may ignore it. See [Naming the object](#naming-the-object)
