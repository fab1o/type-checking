"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageBuilder = void 0;

var _config = require("../config");

var _util = require("../util");

var _params = require("./params");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @desc Error message builder.
 */
var MessageBuilder = /*#__PURE__*/function () {
  /**
   * @param {TypeChecking.MessageBuilder.MethodSignature} methodSignature
   */
  function MessageBuilder(methodSignature) {
    _classCallCheck(this, MessageBuilder);

    this.methodSignature = methodSignature;
    this.param = null;
  }
  /**
   * @param {String} name Param name.
   * @param {TypeChecking.MessageBuilder.Param} [parent] - The parent param.
   * @desc Sets the current param based on a given param name.
   */


  _createClass(MessageBuilder, [{
    key: "setCurrentParam",
    value: function setCurrentParam(name, parent) {
      this.param = this.methodSignature.findParam(name, parent);
    }
    /**
     * @param {Object<TypeChecking.Type>} objParams - Params built with Types.
     * @param {Boolean} [isArray=false] - Helps identify that an object is enclosed by an array.
     * @desc Sets the inner params of the current param.
     * @throws {ReferenceError} Internal failure.
     * @returns {TypeChecking.MessageBuilder.Param} The current param.
     */

  }, {
    key: "setParentParams",
    value: function setParentParams(objParams) {
      var isArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // setCurrentParam() must be called before setParentParams(), this.param should never be null here
      if (this.param == null) {
        throw ReferenceError('setParentParams(...) this.param is null. Call setCurrentParam() before.');
      }

      this.param.params = new _params.Params(objParams, {
        parent: this.param
      });
      this.param.isArray = isArray;
      return this.param;
    }
    /**
     * @param {*} value - Value to stringify.
     * @returns {String} The "but received..." part of the error message.
     */

  }, {
    key: "buildCustomMessage",

    /**
     * @param {String} customMessage - Custom error message.
     * @desc Creates a custom error message.
     * @returns {String} Error message: "Object.method() custom error message."
     */
    value: function buildCustomMessage(customMessage) {
      return "".concat(this.methodSignature, " ").concat(customMessage, ".").trim();
    }
    /**
     * @param {Object} options
     * @param {*} options.value - The user data.
     * @param {TypeChecking.Type} options.type - Type of validator.
     * @param {Array<*>} [options.expectedArgs=[]] - Expected arguments, must set to null when an empty string could be valid.
     * @param {String} [options.message] - Custom error message.
     * @param {Boolean} [options.isNested=false] - Whether it is expected nested object.
     * @desc Generates the error message.
     * @returns {String} Error message: "Object.method(param, param2, ...) param expected a type but received input."
     */

  }, {
    key: "buildMessage",
    value: function buildMessage(options) {
      var value = options.value,
          type = options.type,
          _options$expectedArgs = options.expectedArgs,
          expectedArgs = _options$expectedArgs === void 0 ? [] : _options$expectedArgs,
          message = options.message,
          _options$isNested = options.isNested,
          isNested = _options$isNested === void 0 ? false : _options$isNested;
      var typeDescription = type.toString.apply(type, [message].concat(_toConsumableArray(expectedArgs)));
      var expected = "".concat(_config.Config.expectedMessage, " ").concat(typeDescription);
      var butReceived = MessageBuilder.buildReceivedMessage(value);
      var withProperties = isNested ? " ".concat(_config.Config.withPropsMessage) : '';
      return "".concat(this.methodSignature, " ").concat(this.param, " ").concat(expected).concat(withProperties).concat(this.param.extension, " ").concat(butReceived, ".");
    }
  }], [{
    key: "buildReceivedMessage",
    value: function buildReceivedMessage(value) {
      var valueName = (0, _util.getValueName)(value, {
        includeTypeName: true
      });
      return "".concat(_config.Config.receivedMessage, " ").concat(valueName);
    }
  }]);

  return MessageBuilder;
}();

exports.MessageBuilder = MessageBuilder;