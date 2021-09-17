"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssertsPromise = void 0;

var _validateCreator = require("../../validateCreator");

var _getArgumentValueName = require("../../util/getArgumentValueName");

var orAsserts = ['null', 'undefined'];
var AssertsPromise = {
  thenable: {
    singular: 'a Promise',
    plural: 'promises',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts
  }
};
exports.AssertsPromise = AssertsPromise;