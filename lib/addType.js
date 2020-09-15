"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addType = addType;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

var _type = require("./types/type");

var _types = require("./types/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @param {String} name Type name.
 * @param {Function} validator Custom function that validates input, must return boolean.
 * @param {Object} [options]
 * @param {String} [options.singular] Name in singular.
 * @param {String} [options.plural] Name in plural.
 * @param {Boolean} [options.expectArgs=false] Whether type expects an argument or not.
 * @param {Boolean} [options.autoDisplayArgs=true] Whether or not automatically display arguments.
 * @param {Function} [options.stringify=getArgumentValueName] A function to replace the default getArgumentValueName function for the arguments of this type.
 * @desc Creates a user defined type and adds it to Types object. A shortened syntax for Types.custom.
 * @example
 * const isBlueberry = (a) => String(a) === 'blueberry';
 *
 * addType('blueberry', isBlueberry, {
 *   singular: 'a Blueberry',
 *   plural: 'blueberries'
 * });
 * const params = {
 *    blueberry: Types.blueberry,
 *    maybeBlueberry: Types.blueberry.optional
 * };
 */
function addType(name, validator) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var signature = 'addType(name, validator, options)';

  if (_checkTypes["default"].assigned(_types.Types[name])) {
    throw SyntaxError("".concat(signature, " name expected a Type name that does not already exist in Types."));
  }

  if (_checkTypes["default"].not["function"](validator)) {
    throw SyntaxError("".concat(signature, " validator expected a Function that returns boolean."));
  }

  if (_checkTypes["default"].not.object(options)) {
    throw SyntaxError("".concat(signature, " [options] expected an Object."));
  }

  var type = new _type.Type(name, options);
  Object.defineProperty(_types.Types, name, {
    value: type.createCustomValidator(validator, options.singular),
    writable: false,
    configurable: false
  });
  var arrayOfType = new _type.Type(name, _objectSpread(_objectSpread({}, options), {}, {
    isArray: true
  }));
  Object.defineProperty(_types.Types.array.of, name, {
    value: arrayOfType.createCustomValidator(validator, options.plural),
    writable: false,
    configurable: false
  });
}