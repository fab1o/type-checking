"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssertsAll = void 0;

var _validateCreator = require("../../validateCreator");

var _getArgumentValueName = require("../../util/getArgumentValueName");

var AssertsAll = {
  assigned: {
    singular: 'an assigned value',
    plural: 'assigned values',
    expectArgs: false,
    isExtensible: false,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: null
  },
  custom: {
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.customValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: null
  },
  equal: {
    singular: '{a}',
    plural: '{a}',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: ['null', 'undefined']
  },
  skip: {
    singular: 'a value',
    expectArgs: false,
    isExtensible: false,
    isArrayable: false,
    isLoggable: true,
    validateCreator: _validateCreator.skipValidateCreator,
    orAsserts: null
  }
};
exports.AssertsAll = AssertsAll;