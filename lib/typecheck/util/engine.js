"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.engine = engine;

var _checkTypes = require("check-types");

var _config = require("../../config");

var _messageBuilder = require("../../messageBuilder");

var _util = require("../../util");

var _ = require(".");

function engine(isOneOfRequired) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var _composeOverloading = (0, _.composeOverloading)(args),
      signature = _composeOverloading.signature,
      object = _composeOverloading.a,
      method = _composeOverloading.b,
      params = _composeOverloading.c,
      input = _composeOverloading.d,
      _composeOverloading$e = _composeOverloading.e,
      ErrorType = _composeOverloading$e === void 0 ? _config.Config.Error : _composeOverloading$e;

  (0, _checkTypes.assert)((0, _.isObjectTypes)(params), "".concat(signature, " params ").concat(_config.Config.expectedMessage, " an Object built with Types."), _config.Config.DefaultError);
  var inputType = (0, _util.getUserInputType)(input);
  (0, _checkTypes.assert)(inputType !== _util.UserInputTypes.none, "".concat(signature, " arguments ").concat(_config.Config.expectedMessage, " an Array or an Object. Make sure you configure params and invoke typecheck correctly."), _config.Config.DefaultError);
  var isBracketsForced = inputType === _util.UserInputTypes.object;
  var methodSignature = new _messageBuilder.MethodSignature({
    object: object,
    method: method,
    params: params,
    isBracketsForced: isBracketsForced
  });
  var messageBuilder = new _messageBuilder.MessageBuilder(methodSignature);
  (0, _util.typecheckParams)({
    input: input,
    params: params,
    messageBuilder: messageBuilder,
    ErrorType: ErrorType,
    isOneOfRequired: isOneOfRequired
  });
}