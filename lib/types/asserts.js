"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Asserts = void 0;

var _validateCreator = require("../validateCreator");

var _util = require("../util");

var _validator = require("./validator");

var Asserts = [{
  assertName: 'array',
  singular: 'an Array',
  plural: 'arrays',
  expectArgs: false,
  isArrayable: false,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'arrayBufferView',
  singular: 'an ArrayBufferView',
  plural: 'arrayBufferViews',
  expectArgs: false,
  isArrayable: false,
  validateCreator: _validateCreator.genericValidateCreator,
  validator: _validator.arrayBufferViewValidator
}, {
  assertName: 'assigned',
  singular: 'an assigned value',
  plural: 'assigned values',
  expectArgs: false,
  isArrayable: false,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'boolean',
  singular: 'a Boolean',
  plural: 'booleans',
  expectArgs: false,
  isArrayable: false,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'custom',
  expectArgs: true,
  isArrayable: false,
  validateCreator: _validateCreator.customValidateCreator
}, {
  assertName: 'date',
  singular: 'a Date',
  plural: 'dates',
  expectArgs: false,
  isArrayable: false,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'dateString',
  singular: 'a String in ISO date format',
  plural: 'strings in ISO date format',
  expectArgs: false,
  isArrayable: false,
  validateCreator: _validateCreator.genericValidateCreator,
  validator: _validator.dateStringValidator
}, {
  assertName: 'function',
  singular: 'a Function',
  plural: 'functions',
  expectArgs: false,
  isArrayable: false,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'greaterOrEqual',
  singular: 'a Number greater or equal to {a}',
  plural: 'numbers greater or equal to {a}',
  expectArgs: true,
  isArrayable: false,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'in',
  singular: 'one of [{a}]',
  plural: 'one of [{a}]',
  expectArgs: true,
  isArrayable: true,
  stringifyArgs: _util.stringifyValues,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'inheritance',
  arrayLike: 'inheritance',
  singular: 'a type that inherits from {a}',
  plural: 'types that inherit from {a}',
  expectArgs: true,
  isArrayable: true,
  stringifyArgs: _util.getTypeToString,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'instanceStrict',
  singular: 'an instance of {a}',
  plural: 'instances of {a}',
  expectArgs: true,
  isArrayable: true,
  stringifyArgs: _util.getTypeToString,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'integer',
  singular: 'an integer',
  plural: 'integers',
  expectArgs: false,
  isArrayable: false,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'keyIn',
  singular: 'as a key in [{a}]',
  plural: 'as keys in [{a}]',
  expectArgs: true,
  isArrayable: false,
  stringifyArgs: _util.stringifyKeys,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'like',
  singular: 'an Object that matches {{a}}',
  plural: 'objects that match {{a}}',
  expectArgs: true,
  isArrayable: false,
  stringifyArgs: _util.stringifyKeys,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'nonEmptyObject',
  singular: 'a non-empty Object',
  plural: 'non-empty objects',
  expectArgs: false,
  isArrayable: true,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'nonEmptyString',
  singular: 'a non-empty String',
  plural: 'non-empty strings',
  expectArgs: false,
  isArrayable: true,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'number',
  singular: 'a Number',
  plural: 'numbers',
  expectArgs: false,
  isArrayable: true,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'object',
  singular: 'an Object',
  plural: 'objects',
  expectArgs: true,
  isArrayable: true,
  validateCreator: _validateCreator.objectValidateCreator
}, {
  assertName: 'positive',
  singular: 'a Number greater than 0',
  plural: 'numbers greater than 0',
  expectArgs: false,
  isArrayable: false,
  validateCreator: _validateCreator.genericValidateCreator
}, {
  assertName: 'skip',
  singular: 'a value',
  expectArgs: false,
  isExtensible: false,
  isArrayable: false,
  validateCreator: _validateCreator.skipValidateCreator
}, {
  assertName: 'string',
  singular: 'a String',
  plural: 'strings',
  expectArgs: false,
  isArrayable: true,
  validateCreator: _validateCreator.genericValidateCreator
}];
exports.Asserts = Asserts;