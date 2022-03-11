"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createValidators = createValidators;

var _type = require("../../types/type");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createValidators(type, operator, expectedArgs) {
  var validators = {};
  var asserts = type[operator].asserts;
  Object.keys(asserts).forEach(function (name) {
    var secondType = new _type.Type(name, _objectSpread({
      firstType: type,
      operator: operator
    }, asserts[name]));
    validators[name] = secondType.createValidator(expectedArgs);
  });
  return validators;
}