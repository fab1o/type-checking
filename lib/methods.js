"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Methods = void 0;

var _typeCreator = require("./typeCreator");

var _util = require("./util");

/**
 *
 * @typedef {Object} TypeChecking.Methods
 * @desc Methods object defines all the methods of the Types (check-types library), see
 * `TypeChecking.Type` for more information.
 * @note plural is used to determine if that type will have an 'array.of' equivalent.
 * @note {x} is used to determine if that type receives an argument.
 *
 */
var Methods = {
  array: {
    singular: 'an Array',
    plural: 'arrays'
  },
  "boolean": {
    singular: 'a Boolean',
    plural: 'booleans'
  },
  "function": {
    singular: 'a Function',
    plural: 'functions'
  },
  string: {
    singular: 'a String',
    plural: 'strings'
  },
  "null": {
    singular: 'null',
    plural: 'null'
  },
  thenable: {
    singular: 'a Promise',
    plural: 'promises'
  },
  date: {
    singular: 'a Date',
    plural: 'dates'
  },
  nonEmptyArray: {
    singular: 'a non-empty Array',
    plural: 'non-empty arrays'
  },
  nonEmptyString: {
    singular: 'a non-empty String',
    plural: 'non-empty strings'
  },
  number: {
    singular: 'a Number',
    plural: 'numbers'
  },
  integer: {
    singular: 'an integer',
    plural: 'integers'
  },
  "float": {
    singular: 'a float Number',
    plural: 'float numbers'
  },
  positive: {
    singular: 'a Number greater than 0',
    plural: 'numbers greater than 0'
  },
  negative: {
    singular: 'a Number lower than 0',
    plural: 'numbers lower than 0'
  },
  odd: {
    singular: 'an odd Number',
    plural: 'odd numbers'
  },
  even: {
    singular: 'an even Number',
    plural: 'even numbers'
  },
  between: {
    singular: 'a Number between {x} and {y}',
    plural: 'numbers between {x} and {y}'
  },
  inRange: {
    singular: 'a Number in the range {x} to {y}',
    plural: 'numbers in the range {x} to {y}'
  },
  greater: {
    singular: 'a Number greater than {x}',
    plural: 'numbers greater than {x}'
  },
  greaterOrEqual: {
    singular: 'a Number greater or equal to {x}',
    plural: 'numbers greater or equal to {x}'
  },
  less: {
    singular: 'a Number less than {x}',
    plural: 'numbers less than {x}'
  },
  lessOrEqual: {
    singular: 'a Number less or equal to {x}',
    plural: 'Numbers less or equal to {x}'
  },
  instance: {
    singular: 'an instance of {x}',
    plural: 'instances of {x}',
    stringify: _util.getTypeName
  },
  instanceStrict: {
    singular: 'an instance of {x}',
    plural: 'instances of {x}',
    stringify: _util.getTypeName
  },
  like: {
    singular: 'an Object that matches {{x}}',
    plural: 'objects that match {{x}}',
    stringify: _util.stringifyKeys
  },
  "in": {
    singular: 'to be in [{x}]',
    plural: 'to be in [{x}]',
    stringify: _util.stringifyValues
  },
  keyIn: {
    singular: 'as a key in [{x}]',
    plural: 'as keys in [{x}]',
    stringify: _util.stringifyKeys
  },
  match: {
    singular: 'a String that matches [{x}]',
    plural: 'strings that match [{x}]',
    stringify: _util.stringifyValues
  },
  nonEmptyObject: {
    singular: 'a non-empty Object',
    plural: 'non-empty objects'
  },
  object: {
    singular: 'an Object',
    plural: 'objects',
    isExpectedArgs: true,
    typeCreator: _typeCreator.objectTypeCreator
  },
  custom: {
    plural: true,
    isExpectedArgs: true,
    typeCreator: _typeCreator.customTypeCreator
  }
};
exports.Methods = Methods;