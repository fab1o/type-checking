"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Asserts = void 0;

var _validateCreator = require("../validateCreator");

var _util = require("../util");

/*
 * check-type asserts as of today:
 *
 * ["equal", "undefined", "null", "assigned", "primitive", "contains", "in", "containsKey",
 * "keyIn", "zero", "one", "infinity", "number", "integer", "float", "even", "odd", "greater",
 * "less", "between", "greaterOrEqual", "lessOrEqual", "inRange", "positive", "negative",
 * "string", "emptyString", "nonEmptyString", "match", "boolean", "object", "emptyObject",
 * "nonEmptyObject", "instanceStrict", "thenable", "instance", "like", "array", "emptyArray",
 * "nonEmptyArray", "arrayLike", "iterable", "date", "function", "hasLength", "throws"]
 */

/**
 * @desc Asserts object defines all the asserts of the Types (check-types library).
 * @note all assserts have an 'array.of' equivalent.
 * @note {a} and {b} are used to determine if an assert receives argument(s).
 */
var Asserts = {
  array: {
    singular: 'an Array',
    plural: 'arrays',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  assigned: {
    singular: 'an assigned value',
    plural: 'assigned values',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  between: {
    singular: 'a Number between {a} and {b}',
    plural: 'numbers between {a} and {b}',
    expectArgs: true,
    validateCreator: _validateCreator.genericValidateCreator
  },
  "boolean": {
    singular: 'a Boolean',
    plural: 'booleans',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  custom: {
    expectArgs: true,
    validateCreator: _validateCreator.customValidateCreator
  },
  date: {
    singular: 'a Date',
    plural: 'dates',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  dateString: {
    singular: 'a String in ISO date format',
    plural: 'strings in ISO date format',
    expectArgs: false,
    validateCreator: _validateCreator.dateStringValidateCreator
  },
  emptyArray: {
    singular: 'an empty Array',
    plural: 'empty arrays',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  emptyObject: {
    singular: 'an empty Object',
    plural: 'empty objects',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  emptyString: {
    singular: 'an empty String',
    plural: 'empty strings',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  equal: {
    singular: '{a}',
    plural: '{a}',
    expectArgs: true,
    validateCreator: _validateCreator.genericValidateCreator
  },
  even: {
    singular: 'an even Number',
    plural: 'even numbers',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  "float": {
    singular: 'a float Number',
    plural: 'float numbers',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  "function": {
    singular: 'a Function',
    plural: 'functions',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  greater: {
    singular: 'a Number greater than {a}',
    plural: 'numbers greater than {a}',
    expectArgs: true,
    validateCreator: _validateCreator.genericValidateCreator
  },
  greaterOrEqual: {
    singular: 'a Number greater or equal to {a}',
    plural: 'numbers greater or equal to {a}',
    expectArgs: true,
    validateCreator: _validateCreator.genericValidateCreator
  },
  "in": {
    singular: 'one of [{a}]',
    plural: 'one of [{a}]',
    expectArgs: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.stringifyValues
  },
  inheritance: {
    singular: 'a type that inherits from {a}',
    plural: 'types that inherit from {a}',
    expectArgs: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.getTypeName
  },
  inRange: {
    singular: 'a Number in the range {a} to {b}',
    plural: 'numbers in the range {a} to {b}',
    expectArgs: true,
    validateCreator: _validateCreator.genericValidateCreator
  },
  instance: {
    singular: 'an instance of {a}',
    plural: 'instances of {a}',
    expectArgs: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.getTypeName
  },
  instanceStrict: {
    singular: 'an instance of {a}',
    plural: 'instances of {a}',
    expectArgs: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.getTypeName
  },
  integer: {
    singular: 'an integer',
    plural: 'integers',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  iterable: {
    singular: 'an iterable object',
    plural: 'iterable objects',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  keyIn: {
    singular: 'as a key in [{a}]',
    plural: 'as keys in [{a}]',
    expectArgs: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.stringifyKeys
  },
  less: {
    singular: 'a Number less than {a}',
    plural: 'numbers less than {a}',
    expectArgs: true,
    validateCreator: _validateCreator.genericValidateCreator
  },
  lessOrEqual: {
    singular: 'a Number less or equal to {a}',
    plural: 'Numbers less or equal to {a}',
    expectArgs: true,
    validateCreator: _validateCreator.genericValidateCreator
  },
  like: {
    singular: 'an Object that matches {{a}}',
    plural: 'objects that match {{a}}',
    expectArgs: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.stringifyKeys
  },
  match: {
    singular: 'a String that matches /{a}/',
    plural: 'strings that match /{a}/',
    expectArgs: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.stringifyValues
  },
  negative: {
    singular: 'a Number lower than 0',
    plural: 'numbers lower than 0',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  nonEmptyArray: {
    singular: 'a non-empty Array',
    plural: 'non-empty arrays',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  nonEmptyObject: {
    singular: 'a non-empty Object',
    plural: 'non-empty objects',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  nonEmptyString: {
    singular: 'a non-empty String',
    plural: 'non-empty strings',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  "null": {
    singular: 'null',
    plural: 'null',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  number: {
    singular: 'a Number',
    plural: 'numbers',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  object: {
    singular: 'an Object',
    plural: 'objects',
    expectArgs: true,
    validateCreator: _validateCreator.objectValidateCreator
  },
  odd: {
    singular: 'an odd Number',
    plural: 'odd numbers',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  positive: {
    singular: 'a Number greater than 0',
    plural: 'numbers greater than 0',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  skip: {
    expectArgs: false,
    validateCreator: _validateCreator.skipValidateCreator
  },
  string: {
    singular: 'a String',
    plural: 'strings',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  thenable: {
    singular: 'a Promise',
    plural: 'promises',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  },
  undefined: {
    singular: 'undefined',
    plural: 'undefined',
    expectArgs: false,
    validateCreator: _validateCreator.genericValidateCreator
  }
};
exports.Asserts = Asserts;