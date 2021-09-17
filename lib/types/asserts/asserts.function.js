"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssertsFunction = void 0;

var _validateCreator = require("../../validateCreator");

var _getArgumentValueName = require("../../util/getArgumentValueName");

var orAsserts = ['null', 'undefined'];
var AssertsFunction = {
  "function": {
    singular: 'a Function',
    plural: 'functions',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts
  }
};
exports.AssertsFunction = AssertsFunction;