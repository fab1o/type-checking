"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeOverloading = composeOverloading;

var _checkTypes = _interopRequireDefault(require("check-types"));

var _util = require("../../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 *
 * @param {Array} args User input (arguments).
 * @param {String} [methodName='typecheck'] Method name to be used in the signature.
 * @desc Transforms user input into a distinct Object.
 * @returns {Object} An object like {signature, a, b, c, d, e}.
 *
 */
function composeOverloading(args) {
  var methodName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'typecheck';
  var object, method, params, input, errorType;
  var signature = "".concat(methodName, "(...)");

  switch (args.length) {
    case 5:
      // typecheck(object, method, params, arguments, errorType)
      var _args = _slicedToArray(args, 5);

      object = _args[0];
      method = _args[1];
      params = _args[2];
      input = _args[3];
      errorType = _args[4];
      break;

    case 4:
      if ((0, _util.inheritance)(args[3], Error)) {
        if (_checkTypes["default"]["function"](args[0]) || _checkTypes["default"].string(args[0])) {
          // typecheck(function, params, arguments, errorType)
          var _args2 = _slicedToArray(args, 4);

          method = _args2[0];
          params = _args2[1];
          input = _args2[2];
          errorType = _args2[3];
        } else {
          // typecheck(object, params, arguments, errorType)
          var _args3 = _slicedToArray(args, 4);

          object = _args3[0];
          params = _args3[1];
          input = _args3[2];
          errorType = _args3[3];
        }
      } else {
        // typecheck(object, method, params, arguments)
        var _args4 = _slicedToArray(args, 4);

        object = _args4[0];
        method = _args4[1];
        params = _args4[2];
        input = _args4[3];
      }

      break;

    case 3:
      if ((0, _util.inheritance)(args[2], Error)) {
        // typecheck(params, arguments, errorType)
        var _args5 = _slicedToArray(args, 3);

        params = _args5[0];
        input = _args5[1];
        errorType = _args5[2];
      } else if (_checkTypes["default"]["function"](args[0]) || _checkTypes["default"].string(args[0])) {
        // typecheck(function, params, arguments)
        var _args6 = _slicedToArray(args, 3);

        method = _args6[0];
        params = _args6[1];
        input = _args6[2];
      } else {
        // typecheck(object, params, arguments)
        var _args7 = _slicedToArray(args, 3);

        object = _args7[0];
        params = _args7[1];
        input = _args7[2];
      }

      break;

    case 2:
      // typecheck(params, arguments)
      var _args8 = _slicedToArray(args, 2);

      params = _args8[0];
      input = _args8[1];
      break;

    default:
      var _args9 = _slicedToArray(args, 1);

      params = _args9[0];
      break;
  }
  /**
   *
   * @property {String} signature
   * @property {Object|String} object Instance of a class, object or name.
   * @property {Function|String} method Function or function name.
   * @property {Object<TypeChecking.Type>} params Params built with Types.
   * @property {Array|Object} input User input (arguments).
   * @property {Error} errorType The Error type to throw.
   *
   */


  return {
    signature: signature,
    a: object,
    b: method,
    c: params,
    d: input,
    e: errorType
  };
}