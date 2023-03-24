# @fab1o/type-checking

Throws an `Error` when data fails to meet params configuration, ensuring data quality, i.e. data is both correct and useful.

```sh
npm install @fab1o/type-checking
```

## Documentation

https://github.com/fab1o/type-checking/blob/master/docs/index.md

### Usage

```js
import { Types, typecheck } from '@fab1o/type-checking';
```

### Examples

It supports any type of classes and functions.

#### Classes

```js
import { Types, typecheck } from '@fab1o/type-checking';

class Client {
    constructor(name) {
        const params = {
            name: Types.string
        };

        typecheck(this, params, arguments);
    }

    changeInfo(name) {
        const params = {
            name: Types.string
        };

        typecheck(this, 'changeInfo', params, arguments);
        // or
        typecheck(this, this.changeInfo, params, arguments);
    }
}

new Client(2020);
// error: "Client(name) name expected a String but received a Number: 2020."

const client = new Client('Client');
// success

client.changeInfo();
// error: "Client.changeInfo(name) name expected a String but received undefined."
```

#### Functions

It also works with simple functions.

```js
function setYear(year) {
    const params = {
        year: Types.number.optional
    };

    typecheck('setYear', params, arguments);
    // or
    typecheck(setYear, params, arguments);
}

setYear(NaN);
// error: "setYear(year) year expected a Number or null or undefined but received NaN."

setYear(2020);
// success
setYear(null);
// success
setYear();
// success
```

#### Just data

Or without a function at all.

```js
const params = {
    name: Types.string,
    year: Types.number
};

const data = {
    name: 'Name',
    year: 2020
};

typecheck(params, data);
// success
```

#### Logging

It also supports logging a warn message without throwing an error using `.warn` (for each parameter or all parameters):

```js
const params = {
    name: Types.string.warn,
    year: Types.numbe.warn
};

const data = {};

typecheck(params, data);
// does not throw an error, uses console.warn() instead
```

or for all parameters:

```js
typecheck.warn(params, data);
```

### Motivation

1. Simplification: It makes type-checking clean, declarative, easy to read and maintain;
2. Performance: Avoids creating the error message before the assertion fails in most cases;
3. Configurable: Throw your own Error object, and customize the error messages to your liking;
4. Featureful: Array of types, Optional, Nullable, Undefinable and Logging types, Custom types and User-defined types;
5. Smart error messages enable easier troubleshooting:
    - Dynamic function signature;
    - Base class parameters indicator;
    - Expected type and expected data;
    - Received data;

### Credits

-   [Fabio Costa](https://github.com/fab1o)
