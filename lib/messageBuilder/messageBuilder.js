"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageBuilder = void 0;
var _params = require("./params");
var _buildExpectedMessage = require("./buildExpectedMessage");
var _buildReceivedMessage = require("./buildReceivedMessage");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var MessageBuilder = function () {
  function MessageBuilder(methodSignature) {
    _classCallCheck(this, MessageBuilder);
    this.methodSignature = methodSignature;
    this.param = null;
  }
  _createClass(MessageBuilder, [{
    key: "setCurrentParam",
    value: function setCurrentParam(name, parent) {
      this.param = this.methodSignature.findParam(name, parent);
    }
  }, {
    key: "setParentParams",
    value: function setParentParams(objParams) {
      var isArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.param == null) {
        throw ReferenceError('setParentParams(...) this.param is null. Call setCurrentParam() before.');
      }
      this.param.params = new _params.Params(objParams, {
        parent: this.param
      });
      this.param.isArray = isArray;
      return this.param;
    }
  }, {
    key: "buildCustomMessage",
    value: function buildCustomMessage(customMessage) {
      return "".concat(this.methodSignature, " ").concat(customMessage, ".");
    }
  }, {
    key: "buildMessage",
    value: function buildMessage(options) {
      var value = options.value;
      var expected = (0, _buildExpectedMessage.buildExpectedMessage)(options);
      var butReceived = (0, _buildReceivedMessage.buildReceivedMessage)(value);
      return "".concat(this.methodSignature, " ").concat(this.param, " ").concat(expected).concat(this.param.extension, " ").concat(butReceived, ".");
    }
  }]);
  return MessageBuilder;
}();
exports.MessageBuilder = MessageBuilder;