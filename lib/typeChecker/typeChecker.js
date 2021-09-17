"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeChecker = void 0;

var _config = require("../config");

var _util = require("../util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TypeChecker = function () {
  function TypeChecker(options) {
    _classCallCheck(this, TypeChecker);

    var messageBuilder = options.messageBuilder,
        input = options.input,
        objParams = options.objParams,
        _options$ErrorType = options.ErrorType,
        ErrorType = _options$ErrorType === void 0 ? _config.Config.ErrorType : _options$ErrorType,
        signature = options.signature,
        loggingFunc = options.loggingFunc;
    this.messageBuilder = messageBuilder;
    this.input = input;
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
      var _options$input = options.input,
          input = _options$input === void 0 ? this.input : _options$input,
          _options$objParams = options.objParams,
          objParams = _options$objParams === void 0 ? this.objParams : _options$objParams,
          parent = options.parent;
      Object.keys(objParams).forEach(function (name, paramIndex) {
        var paramValidate = objParams[name];

        _this.messageBuilder.setCurrentParam(name, parent);

        (0, _util.verifyValidateFunction)(paramValidate, {
          param: _this.messageBuilder.param,
          signature: _this.signature
        });
        var value = (0, _util.getValue)(input, paramIndex, name);
        paramValidate(value, _this);
      });
    }
  }]);

  return TypeChecker;
}();

exports.TypeChecker = TypeChecker;