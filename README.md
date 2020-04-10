# Type Checking

Throws Error when user input fails to meet params configuration.

```sh
npm install @fab1o/type-checking
```

## Documentation

Located [here](/Doc.md).

## Motivation

1. Simplification: Type checking is clean and easy to read.
2. Performance: Avoids creating the error message unnecessarily. It's created only after the assertion fails.
3. Configurable: Throw your own Error object, and use your own error messages.
4. Skilfull: Required types, Optional types and Nullable types.
5. Smart error messages with:
    - Expected value, with a clear name of the expected type.
    - Optional param indicator, with a square bracket.
    - More base class params indicator, with an etcetera.
    - User input value, allows easier troubleshooting.

### A few examples

```js
/**
 * @param {Object} token
 */
function Person(token) {
    // ...
}

Person(true);
```

| `SyntaxError`                                                          |
| ---------------------------------------------------------------------- |
| `"Person(token) token expected an Object but received a Boolean: true` |

#### With a defined type

```js
/**
 * @param {Token} token
 */
function Person(token) {
    // ...
}

Person(new Object());
```

| `SyntaxError`                                                                    |
| -------------------------------------------------------------------------------- |
| `"Person(token) token expected an instancxe of Token but received an Object: {}` |

#### With an optional param

```js
/**
 * @param {Number} [token]
 */
function Person(token) {
    // ...
}

Person('Fabio');
```

| `SyntaxError`                                                             |
| ------------------------------------------------------------------------- |
| `"Person(token) [token] expected a Number but received a String: "Fabio"` |

#### With options object

```js
/**
 * @param {Object} options
 * @param {Manager} options.manager
 * @param {String} options.token
 */
function Person(options) {
    // ...
}

Person({
    manager: null
});
```

| `SyntaxError`                                                                                    |
| ------------------------------------------------------------------------------------------------ |
| `"Person({ manager, token }) options.manager expected an instance of Manager but received null"` |

#### With relationship between classes

```js
class Animal () {
   /**
   * @param {Object} options
   * @param {String} options.name
   */
   constructor(options) {
      // ...
   }
}

class Dog extends Animal {
   /**
   * @param {Object} options
   * @param {String} options.name
   * @param {Breed} options.breed
   */
   constructor(options) {
      super(options);
      // ...
   }
}

Dog({ name: ['pet'] });
Dog({ name: 'pet', breed: {} });
```

| `SyntaxError`                                                                                  |
| ---------------------------------------------------------------------------------------------- |
| `"Dog({ name, ... }) options.name expected a String but received an Array: ['pet']"`           |
| `"Dog({ breed, ... }) options.breed expected an instance of Breed but received an Object: {}"` |
