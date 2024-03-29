"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeOverloading = composeOverloading;
var _checkTypes = require("@fab1o/check-types");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function composeOverloading(args) {
  var methodName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'typecheck';
  var object, method, params, userArguments, ErrorType;
  var signature = "".concat(methodName, "(...)");
  switch (args.length) {
    case 5:
      var _args = _slicedToArray(args, 5);
      object = _args[0];
      method = _args[1];
      params = _args[2];
      userArguments = _args[3];
      ErrorType = _args[4];
      break;
    case 4:
      if (_checkTypes.Check.inheritance(args[3], Error)) {
        if (_checkTypes.Check["function"](args[0]) || _checkTypes.Check.string(args[0])) {
          var _args2 = _slicedToArray(args, 4);
          method = _args2[0];
          params = _args2[1];
          userArguments = _args2[2];
          ErrorType = _args2[3];
        } else {
          var _args3 = _slicedToArray(args, 4);
          object = _args3[0];
          params = _args3[1];
          userArguments = _args3[2];
          ErrorType = _args3[3];
        }
      } else {
        var _args4 = _slicedToArray(args, 4);
        object = _args4[0];
        method = _args4[1];
        params = _args4[2];
        userArguments = _args4[3];
      }
      break;
    case 3:
      if (_checkTypes.Check.inheritance(args[2], Error)) {
        var _args5 = _slicedToArray(args, 3);
        params = _args5[0];
        userArguments = _args5[1];
        ErrorType = _args5[2];
      } else if (_checkTypes.Check["function"](args[0]) || _checkTypes.Check.string(args[0])) {
        var _args6 = _slicedToArray(args, 3);
        method = _args6[0];
        params = _args6[1];
        userArguments = _args6[2];
      } else {
        var _args7 = _slicedToArray(args, 3);
        object = _args7[0];
        params = _args7[1];
        userArguments = _args7[2];
      }
      break;
    case 2:
      var _args8 = _slicedToArray(args, 2);
      params = _args8[0];
      userArguments = _args8[1];
      break;
    default:
      var _args9 = _slicedToArray(args, 1);
      params = _args9[0];
      break;
  }
  return {
    signature: signature,
    object: object,
    method: method,
    c: params,
    d: userArguments,
    ErrorType: ErrorType
  };
}
