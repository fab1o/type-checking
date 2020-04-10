"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typecheckParams = typecheckParams;

var _checkTypes = _interopRequireDefault(require("check-types"));

var _config = require("../config");

var _getUserInputType = require("./getUserInputType");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *
 * @param {Array|Object} input The user input.
 * @param {Number} i The index in user input.
 * @param {String} name The name of a property in user input.
 * @desc Gets the user input value: Step 2 of typecheckParams.
 * @throws {Error} Internal failure.
 * @returns {*} The respective value in user input.
 *
 *
 */
function getValue(input, i, name) {
  var inputType = (0, _getUserInputType.getUserInputType)(input);

  switch (inputType) {
    case _getUserInputType.UserInputTypes.arguments:
      return input[i];

    case _getUserInputType.UserInputTypes.object:
      return input[name];

    default:
      // it should never get to this point
      throw new Error('typecheckParams() error in step2.');
  }
}
/**
 *
 * @param {Object} options
 * @param {Array|Object} options.input The user input.
 * @param {Object<TypeChecking.Type>} options.params Params object built with Types.
 * @param {TypeChecking.MessageBuilder.MessageBuilder} options.messageBuilder MessageBuilder object.
 * @param {TypeChecking.MessageBuilder.Param} [options.parent] The parent param.
 * @param {Error} [options.ErrorType=Config.Error] The Error type to throw.
 * @param {Boolean} [isOneOfRequired=false] Whether or not to check if at least one is provided (even thou they are all optional).
 * @desc Validates params built with Types against user input.
 *
 */


function typecheckParams(options) {
  var input = options.input,
      params = options.params,
      messageBuilder = options.messageBuilder,
      parent = options.parent,
      _options$ErrorType = options.ErrorType,
      ErrorType = _options$ErrorType === void 0 ? _config.Config.Error : _options$ErrorType,
      _options$isOneOfRequi = options.isOneOfRequired,
      isOneOfRequired = _options$isOneOfRequi === void 0 ? false : _options$isOneOfRequi;
  var isProvided = false;
  Object.keys(params).forEach(function (name, paramIndex) {
    // step 1: get the validator function
    var paramValidate = params[name]; // step 2: get the value: "non-options" params versus "options" param

    var value = getValue(input, paramIndex, name); // step 3: setParam so it can include the param name in the error message

    messageBuilder.setParam(name, parent); // step 4: invoke type's validate function

    paramValidate({
      value: value,
      messageBuilder: messageBuilder,
      paramIndex: paramIndex,
      input: input,
      ErrorType: ErrorType
    }); // step 5 (optional): check if value is provided.

    if (_checkTypes["default"].assigned(value)) {
      isProvided = true;
    }
  }); // step 6 (optional): throw error is non is provided.

  if (isOneOfRequired) {
    var errorMessage = messageBuilder.buildCustomMessage('at least one parameter must be provided');

    _checkTypes["default"].assert(isProvided, errorMessage, ErrorType);
  }
}