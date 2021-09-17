"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssertsArray = void 0;

var _validateCreator = require("../../validateCreator");

var _getArgumentValueName = require("../../util/getArgumentValueName");

var _validator = require("../validator");

var orAsserts = ['null', 'undefined'];
var andAsserts = ['string', 'array'];
var AssertsArray = {
  array: {
    singular: 'an Array',
    plural: 'arrays',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts,
    andAsserts: ['hasLength']
  },
  arrayLike: {
    singular: 'an Array-like',
    plural: 'arrays-like',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts
  },
  arrayBufferView: {
    singular: 'an ArrayBufferView',
    plural: 'arrayBufferViews',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    validator: _validator.arrayBufferViewValidator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: ['nonEmptyString', 'string'].concat(orAsserts)
  },
  emptyArray: {
    singular: 'an empty Array',
    plural: 'empty arrays',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts
  },
  nonEmptyArray: {
    singular: 'a non-empty Array',
    plural: 'non-empty arrays',
    expectArgs: false,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts
  },
  hasLength: {
    singular: 'that has length of {a}',
    plural: 'data with length of {a}',
    expectArgs: true,
    isExtensible: true,
    isArrayable: true,
    isLoggable: true,
    validateCreator: _validateCreator.genericValidateCreator,
    stringify: _getArgumentValueName.getArgumentValueName,
    orAsserts: orAsserts,
    andAsserts: andAsserts
  }
};
exports.AssertsArray = AssertsArray;