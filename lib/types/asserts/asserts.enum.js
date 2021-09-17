"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssertsEnum = void 0;

var _util = require("../../util");

var _validateCreator = require("../../validateCreator");

var orAsserts = ['nonEmptyString', 'string', 'null', 'undefined'];
var AssertsEnum = {
  "in": {
    singular: 'one of [{a}]',
    plural: 'one of [{a}]',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.stringifyValues,
    orAsserts: orAsserts
  },
  keyIn: {
    singular: 'as a key in [{a}]',
    plural: 'as keys in [{a}]',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _util.stringifyKeys,
    orAsserts: orAsserts
  }
};
exports.AssertsEnum = AssertsEnum;