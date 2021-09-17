"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssertsClass = void 0;

var _getTypeName = require("../../util/getTypeName");

var _validateCreator = require("../../validateCreator");

var orAsserts = ['null', 'undefined', 'object', 'like', 'nonEmptyObject', 'instanceStrict', 'instance', 'inheritance'];
var AssertsClass = {
  inheritance: {
    singular: 'a type that inherits from {a}',
    plural: 'types that inherit from {a}',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getTypeName.getTypeName,
    orAsserts: orAsserts
  },
  instance: {
    singular: 'an instance of {a}',
    plural: 'instances of {a}',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getTypeName.getTypeName,
    orAsserts: orAsserts
  },
  instanceStrict: {
    singular: 'an instance of {a}',
    plural: 'instances of {a}',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getTypeName.getTypeName,
    orAsserts: orAsserts
  }
};
exports.AssertsClass = AssertsClass;