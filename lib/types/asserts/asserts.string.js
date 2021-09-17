"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssertsString = void 0;

var _util = require("../../util");

var _validateCreator = require("../../validateCreator");

var _validator = require("../validator");

var orAsserts = ['null', 'undefined'];
var orAssertsPlus = ['arrayBufferView', 'in', 'keyIn', 'null', 'undefined'];
var AssertsString = {
  dateString: {
    singular: 'a String in ISO date format',
    plural: 'strings in ISO date format',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    validator: _validator.dateStringValidator,
    stringify: _util.getArgumentValueName,
    orAsserts: orAsserts
  },
  emptyString: {
    singular: 'an empty String',
    plural: 'empty strings',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.getArgumentValueName,
    orAsserts: orAsserts
  },
  match: {
    singular: 'a String that matches /{a}/',
    plural: 'strings that match /{a}/',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.stringifyValues,
    orAsserts: orAsserts
  },
  nonEmptyString: {
    singular: 'a non-empty String',
    plural: 'non-empty strings',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.getArgumentValueName,
    orAsserts: orAssertsPlus,
    andAsserts: ['hasLength']
  },
  string: {
    singular: 'a String',
    plural: 'strings',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.getArgumentValueName,
    orAsserts: orAssertsPlus,
    andAsserts: ['hasLength']
  }
};
exports.AssertsString = AssertsString;