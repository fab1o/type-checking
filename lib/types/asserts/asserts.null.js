"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssertsNull = void 0;

var _validateCreator = require("../../validateCreator");

var _getArgumentValueName = require("../../util/getArgumentValueName");

var AssertsNull = {
  "null": {
    singular: 'null',
    plural: 'null',
    expectArgs: false,
    isExtensible: false,
    isLoggable: true,
    isArrayable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: null
  },
  undefined: {
    singular: 'undefined',
    plural: 'undefined',
    expectArgs: false,
    isExtensible: false,
    isLoggable: true,
    isArrayable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: null
  }
};
exports.AssertsNull = AssertsNull;