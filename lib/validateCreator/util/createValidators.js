"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createValidators = createValidators;

var _type = require("../../types/type");

var _defineProperty2 = require("../../util/defineProperty");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createValidators(type, operator, expectedArgs) {
  var validators = {
    array: {
      of: {}
    },
    nonEmptyArray: {
      of: {}
    }
  };
  var asserts = type[operator].asserts;
  Object.keys(asserts).forEach(function (name) {
    var secondType = new _type.Type(name, _objectSpread({
      firstType: type,
      operator: operator
    }, asserts[name]));
    (0, _defineProperty2.defineProperty)(validators, name, secondType.createValidator(expectedArgs));
    var secondTypeArray = new _type.Type(name, _objectSpread({
      firstType: type,
      operator: operator,
      arrayOfType: 'array'
    }, asserts[name]));
    (0, _defineProperty2.defineProperty)(validators.array.of, name, secondTypeArray.createValidator(expectedArgs));
    var secondTypeNonEmptyArray = new _type.Type(name, _objectSpread({
      firstType: type,
      operator: operator,
      arrayOfType: 'nonEmptyArray'
    }, asserts[name]));
    (0, _defineProperty2.defineProperty)(validators.nonEmptyArray.of, name, secondTypeNonEmptyArray.createValidator(expectedArgs));
  });
  return validators;
}