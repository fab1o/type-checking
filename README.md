# @fab1o/type-checking

Throws an `Error` when data fails to meet params configuration, ensuring data quality, i.e. data is both correct and useful.

```sh
npm install @fab1o/type-checking
```

## Documentation

https://github.com/fab1o/type-checking/blob/master/docs/index.md

## Motivation

1. Simplification: It makes type-checking clean, declarative, easy to read and maintain;
2. Performance: Avoids creating the error message before the assertion fails in most cases;
3. Configurable: Throw your own Error object, and customize the error messages to your liking;
4. Featureful: Array of types, Optional, Nullable, Undefinable and Logging types, Custom types and User-defined types;
5. Smart error messages enable easier troubleshooting:
    - Dynamic function signature;
    - Base class parameters indicator;
    - Expected type and expected data;
    - Received data;

### Example

```js
import { Types, typecheck } from '@fab1o/type-checking';

function setName(name, year) {
    const params = {
        name: Types.string,
        year: Types.number.optional
    };

    typecheck(setName, params, arguments);
}

setName(2020);
// error: setName(name, year) name expected a String but received a Number: 2020

setName('SDK', '2020');
// error: setName(name, year) year expected a Number or null or undefined but received a String: "2020"

setName('SDK', 2020);
// success
```
