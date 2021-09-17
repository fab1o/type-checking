"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssertsObject = void 0;

var _validateCreator = require("../../validateCreator");

var _util = require("../../util");

var orAsserts = ['null', 'undefined', 'instance', 'instanceScrict'];
var AssertsObject = {
  emptyObject: {
    singular: 'an empty Object',
    plural: 'empty objects',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.getArgumentValueName,
    orAsserts: ['null', 'undefined']
  },
  iterable: {
    singular: 'an iterable object',
    plural: 'iterable objects',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.getArgumentValueName,
    orAsserts: ['null', 'undefined']
  },
  like: {
    singular: 'an Object that matches {{a}}',
    plural: 'objects that match {{a}}',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.stringifyKeys,
    orAsserts: orAsserts
  },
  nonEmptyObject: {
    singular: 'a non-empty Object',
    plural: 'non-empty objects',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.getArgumentValueName,
    orAsserts: orAsserts
  },
  object: {
    singular: 'an Object',
    plural: 'objects',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.objectValidateCreator,
    stringify: _util.getArgumentValueName,
    orAsserts: orAsserts
  }
};
exports.AssertsObject = AssertsObject;