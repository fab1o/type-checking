"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyValidateFunction = verifyValidateFunction;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

var _config = require("../config");

var _buildReceivedMessage = require("../messageBuilder/buildReceivedMessage");

var _param = require("../messageBuilder/param");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function verifyValidateFunction(paramValidate, options) {
  var param = options.param,
      parent = options.parent,
      _options$name = options.name,
      name = _options$name === void 0 ? '' : _options$name,
      _options$signature = options.signature,
      signature = _options$signature === void 0 ? 'typecheck(...)' : _options$signature;

  if (_checkTypes["default"]["function"](paramValidate) && _checkTypes["default"].string(paramValidate.typeName)) {
    return true;
  }

  var paramName;

  if (_checkTypes["default"].instance(param, _param.Param)) {
    paramName = param;
  } else {
    var par = _checkTypes["default"].instance(parent, _param.Param) ? "".concat(parent.name, ".") : '';
    paramName = "".concat(par).concat(name);
  }

  var expected = "".concat(_config.Config.expectedMessage, " a valid type of Types");
  var butReceived = (0, _buildReceivedMessage.buildReceivedMessage)(paramValidate);
  throw TypeError("".concat(signature, " param ").concat(paramName, " ").concat(expected, " ").concat(butReceived, "."));
}