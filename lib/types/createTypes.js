"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTypes = createTypes;

var _defineProperty2 = require("../util/defineProperty");

var _asserts = require("./asserts");

var _type = require("./type");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createTypes(isArray) {
  var types = {};

  _asserts.Asserts.forEach(function (assert) {
    var assertName = assert.assertName,
        isArrayable = assert.isArrayable;

    if (isArray && isArrayable === false) {
      return;
    }

    var type = new _type.Type(assertName, _objectSpread(_objectSpread({}, assert), {}, {
      isArray: isArray
    }));
    (0, _defineProperty2.defineProperty)(types, assertName, type.createValidator());

    if (assertName === 'array') {
      if (isArray) {
        return;
      }

      (0, _defineProperty2.defineProperty)(types.array, 'of', createTypes(true));
    }
  });

  return types;
}