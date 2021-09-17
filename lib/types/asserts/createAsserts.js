"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAsserts = createAsserts;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

var _asserts = require("./asserts.all");

var _asserts2 = require("./asserts.array");

var _asserts3 = require("./asserts.boolean");

var _asserts4 = require("./asserts.class");

var _asserts5 = require("./asserts.date");

var _asserts6 = require("./asserts.enum");

var _asserts7 = require("./asserts.function");

var _asserts8 = require("./asserts.null");

var _asserts9 = require("./asserts.number");

var _asserts10 = require("./asserts.object");

var _asserts11 = require("./asserts.promise");

var _asserts12 = require("./asserts.string");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Asserts = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _asserts.AssertsAll), _asserts2.AssertsArray), _asserts3.AssertsBoolean), _asserts4.AssertsClass), _asserts5.AssertsDate), _asserts6.AssertsEnum), _asserts7.AssertsFunction), _asserts8.AssertsNull), _asserts9.AssertsNumber), _asserts10.AssertsObject), _asserts11.AssertsPromise), _asserts12.AssertsString);

function createAsserts() {
  Object.keys(Asserts).forEach(function (name) {
    var assert = Asserts[name];
    var orAsserts = null;
    var andAsserts = null;

    if (_checkTypes["default"].array(assert.orAsserts)) {
      orAsserts = {};
      assert.orAsserts.forEach(function (a) {
        orAsserts[a] = _objectSpread({}, Asserts[a]);
        orAsserts[a].orAsserts = null;
        orAsserts[a].andAsserts = null;
      });
    }

    if (_checkTypes["default"].array(assert.andAsserts)) {
      andAsserts = {};
      assert.andAsserts.forEach(function (a) {
        andAsserts[a] = _objectSpread({}, Asserts[a]);
        andAsserts[a].orAsserts = null;
        andAsserts[a].andAsserts = null;
      });
    }

    assert.orAsserts = orAsserts;
    assert.andAsserts = andAsserts;
  });
  return Asserts;
}