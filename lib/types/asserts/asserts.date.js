"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssertsDate = void 0;

var _validateCreator = require("../../validateCreator");

var _getArgumentValueName = require("../../util/getArgumentValueName");

var orAsserts = ['null', 'undefined'];
var AssertsDate = {
  date: {
    singular: 'a Date',
    plural: 'dates',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts
  }
};
exports.AssertsDate = AssertsDate;