"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MethodSignature = void 0;
var _checkTypes = require("@fab1o/check-types");
var _util = require("../util");
var _params = require("./params");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var MethodSignature = function () {
  function MethodSignature(options) {
    _classCallCheck(this, MethodSignature);
    var _options$object = options.object,
      object = _options$object === void 0 ? null : _options$object,
      _options$method = options.method,
      method = _options$method === void 0 ? null : _options$method,
      _options$objParams = options.objParams,
      objParams = _options$objParams === void 0 ? null : _options$objParams,
      _options$displayBrack = options.displayBrackets,
      displayBrackets = _options$displayBrack === void 0 ? false : _options$displayBrack;
    var displayEtcetera = (0, _util.hasSuperclass)(object) && method == null;
    this.object = object;
    this.method = method;
    this.params = new _params.Params(objParams, {
      displayEtcetera: displayEtcetera,
      displayBrackets: displayBrackets
    });
  }
  _createClass(MethodSignature, [{
    key: "name",
    get: function get() {
      var objectName = (0, _util.getTypeToString)(this.object, '');
      var methodName = (0, _util.getTypeToString)(this.method, '');
      var dot;
      if (_checkTypes.Check.nonEmptyString(objectName) && _checkTypes.Check.nonEmptyString(methodName)) {
        dot = '.';
      } else {
        dot = '';
      }
      return "".concat(objectName).concat(dot).concat(methodName);
    }
  }, {
    key: "parameters",
    get: function get() {
      var openBracket = '';
      var closBracket = '';
      if (_checkTypes.Check.nonEmptyString(this.name)) {
        openBracket = '(';
        closBracket = ')';
      } else if (this.params.length > 0) {
        openBracket = '{';
        closBracket = '}';
      }
      return "".concat(openBracket).concat(this.params).concat(closBracket);
    }
  }, {
    key: "findParam",
    value: function findParam(name) {
      var _parent$params;
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (_parent$params = parent === null || parent === void 0 ? void 0 : parent.params) !== null && _parent$params !== void 0 ? _parent$params : this.params;
      var param = null;
      for (var i = 0; i < params.length; i++) {
        param = params.get(i);
        if (_checkTypes.Check.instanceStrict(param, _params.Params)) {
          param = this.findParam(name, parent, param);
        }
        if (param != null && param.name === name && param.parent === parent) {
          break;
        }
      }
      if (param == null) {
        throw ReferenceError("findParam(...) not able to find param: ".concat(name, "."));
      }
      return param;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.name).concat(this.parameters);
    }
  }]);
  return MethodSignature;
}();
exports.MethodSignature = MethodSignature;
