"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeChecker = void 0;
var _config = require("../config");
var _util = require("../util");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TypeChecker = function () {
  function TypeChecker(options) {
    _classCallCheck(this, TypeChecker);
    var messageBuilder = options.messageBuilder,
      userArguments = options.userArguments,
      objParams = options.objParams,
      _options$ErrorType = options.ErrorType,
      ErrorType = _options$ErrorType === void 0 ? _config.Config.ErrorType : _options$ErrorType,
      signature = options.signature,
      loggingFunc = options.loggingFunc;
    this.messageBuilder = messageBuilder;
    this.userArguments = userArguments;
    this.objParams = objParams;
    this.ErrorType = ErrorType;
    this.signature = signature;
    this.loggingFunc = loggingFunc;
  }
  _createClass(TypeChecker, [{
    key: "execute",
    value: function execute() {
      var _this = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _options$userData = options.userData,
        userData = _options$userData === void 0 ? this.userArguments : _options$userData,
        _options$objParams = options.objParams,
        objParams = _options$objParams === void 0 ? this.objParams : _options$objParams,
        parent = options.parent;
      Object.keys(objParams).forEach(function (name, paramIndex) {
        var paramValidate = objParams[name];
        _this.messageBuilder.setCurrentParam(name, parent);
        var value = (0, _util.getValue)(userData, paramIndex, name);
        paramValidate(value, _this);
      });
    }
  }]);
  return TypeChecker;
}();
exports.TypeChecker = TypeChecker;