"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkValue = checkValue;

var _config = require("../../config");

var _isValueOk = require("./isValueOk");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function checkValue(value, type, typeChecker, loggingFunc, firstTypeExpectedArgs) {
  var firstType = type.firstType,
      operator = type.operator;
  var messageBuilder = typeChecker.messageBuilder,
      ErrorType = typeChecker.ErrorType;
  var funcToLog = loggingFunc || typeChecker.loggingFunc;

  for (var _len = arguments.length, expectedArgs = new Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
    expectedArgs[_key - 5] = arguments[_key];
  }

  var isOk2 = _isValueOk.isValueOk.apply(void 0, [value, type].concat(expectedArgs));

  var isOk = isOk2;

  if (firstType) {
    var isOk1 = _isValueOk.isValueOk.apply(void 0, [value, firstType].concat(_toConsumableArray(firstTypeExpectedArgs)));

    if (isOk1 === false) {
      if (operator === 'and') {
        var errorMessage = messageBuilder.buildMessage({
          value: value,
          type: type,
          firstType: firstType,
          expectedArgs: expectedArgs,
          operator: operator,
          firstTypeExpectedArgs: firstTypeExpectedArgs
        });
        throw new ErrorType(errorMessage);
      }

      if (_config.Config.loggerMethodForOrType) {
        var _errorMessage = messageBuilder.buildMessage({
          value: value,
          expectedArgs: firstTypeExpectedArgs,
          type: firstType
        });

        _config.Config.logger[_config.Config.loggerMethodForOrType](_errorMessage);
      }
    }

    isOk = operator === 'or' ? isOk1 || isOk2 : isOk1 && isOk2;
  }

  if (isOk === false) {
    var _errorMessage2 = messageBuilder.buildMessage({
      value: value,
      type: type,
      firstType: firstType,
      expectedArgs: expectedArgs,
      operator: operator,
      firstTypeExpectedArgs: firstTypeExpectedArgs
    });

    if (funcToLog) {
      _config.Config.logger[funcToLog](_errorMessage2);
    } else {
      throw new ErrorType(_errorMessage2);
    }
  }

  return isOk;
}