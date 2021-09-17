"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssertsNumber = void 0;

var _validateCreator = require("../../validateCreator");

var _getArgumentValueName = require("../../util/getArgumentValueName");

var orAsserts = ['null', 'undefined'];
var oddEvenAndAsserts = ['negative', 'positive', 'integer', 'float'];
var intFloatAndAsserts = ['odd', 'even', 'negative', 'positive', 'greater', 'less', 'greaterOrEqual', 'lessOrEqual'];
var negPosAndAsserts = ['odd', 'even', 'integer', 'float'];
var AssertsNumber = {
  between: {
    singular: 'a Number between {a} and {b}',
    plural: 'numbers between {a} and {b}',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts
  },
  even: {
    singular: 'an even Number',
    plural: 'even numbers',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts,
    andAsserts: oddEvenAndAsserts
  },
  "float": {
    singular: 'a float Number',
    plural: 'float numbers',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts,
    andAsserts: intFloatAndAsserts
  },
  greater: {
    singular: 'a Number greater than {a}',
    plural: 'numbers greater than {a}',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: ['less', 'null', 'undefined'],
    andAsserts: negPosAndAsserts
  },
  greaterOrEqual: {
    singular: 'a Number greater or equal to {a}',
    plural: 'numbers greater or equal to {a}',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts,
    andAsserts: negPosAndAsserts
  },
  inRange: {
    singular: 'a Number in the range {a} to {b}',
    plural: 'numbers in the range {a} to {b}',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts
  },
  integer: {
    singular: 'an integer',
    plural: 'integers',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts,
    andAsserts: intFloatAndAsserts
  },
  less: {
    singular: 'a Number less than {a}',
    plural: 'numbers less than {a}',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: ['greater', 'null', 'undefined'],
    andAsserts: negPosAndAsserts
  },
  lessOrEqual: {
    singular: 'a Number less or equal to {a}',
    plural: 'Numbers less or equal to {a}',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts,
    andAsserts: negPosAndAsserts
  },
  nan: {
    singular: 'NaN',
    plural: 'NaN',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts
  },
  negative: {
    singular: 'a Number lower than 0',
    plural: 'numbers lower than 0',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts,
    andAsserts: negPosAndAsserts
  },
  number: {
    singular: 'a Number',
    plural: 'numbers',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts
  },
  odd: {
    singular: 'an odd Number',
    plural: 'odd numbers',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts,
    andAsserts: oddEvenAndAsserts
  },
  positive: {
    singular: 'a Number greater than 0',
    plural: 'numbers greater than 0',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts,
    andAsserts: negPosAndAsserts
  }
};
exports.AssertsNumber = AssertsNumber;