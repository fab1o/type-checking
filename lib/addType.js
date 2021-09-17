"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addType = addType;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

var _types = require("./types");

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function addType(name, validator) {
  var _options$stringify, _options$expectArgs, _options$autoDisplayA;

  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var signature = 'addType(name, validator, options)';

  if (_checkTypes["default"].not.nonEmptyString(name)) {
    throw TypeError("".concat(signature, " name expected a non-empty String."));
  }

  if (_checkTypes["default"].assigned(_types.Types[name])) {
    throw TypeError("".concat(signature, " name expected a type name that does not already exist in Types."));
  }

  if (_checkTypes["default"].not["function"](validator)) {
    throw TypeError("".concat(signature, " validator expected a Function that returns boolean."));
  }

  if (_checkTypes["default"].not.object(options)) {
    throw TypeError("".concat(signature, " options expected an Object or undefined."));
  }

  var stringify = (_options$stringify = options.stringify) !== null && _options$stringify !== void 0 ? _options$stringify : _util.getArgumentValueName;
  var expectArgs = (_options$expectArgs = options.expectArgs) !== null && _options$expectArgs !== void 0 ? _options$expectArgs : false;
  var autoDisplayArgs = (_options$autoDisplayA = options.autoDisplayArgs) !== null && _options$autoDisplayA !== void 0 ? _options$autoDisplayA : true;
  var type = new _types.Type(name, _objectSpread(_objectSpread({}, options), {}, {
    stringify: stringify,
    expectArgs: expectArgs,
    autoDisplayArgs: autoDisplayArgs
  }));
  (0, _util.defineProperty)(_types.Types, name, (0, _util.createCustomValidator)(type, validator, options.singular));
  var arrayOfType = new _types.Type(name, _objectSpread(_objectSpread({}, options), {}, {
    arrayOfType: 'array'
  }));
  (0, _util.defineProperty)(_types.Types.array.of, name, (0, _util.createCustomValidator)(arrayOfType, validator, options.plural));
  var nonEmptyArrayOfType = new _types.Type(name, _objectSpread(_objectSpread({}, options), {}, {
    arrayOfType: 'nonEmptyArray'
  }));
  (0, _util.defineProperty)(_types.Types.nonEmptyArray.of, name, (0, _util.createCustomValidator)(nonEmptyArrayOfType, validator, options.plural));
}