"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageBuilder = void 0;

var _config = require("../config");

var _util = require("./util");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 * @class TypeChecking.MessageBuilder.MessageBuilder
 * @desc Builds a complete error message: "Object.method(param, param2, ...) param expected a type but received input."
 *
 */
var MessageBuilder = /*#__PURE__*/function () {
  /**
   *
   * @param {TypeChecking.MessageBuilder.MethodSignature} methodSignature
   */
  function MessageBuilder(methodSignature) {
    _classCallCheck(this, MessageBuilder);

    this.methodSignature = methodSignature;
    this.param = null;
    this.type = null;
    this.input = null;
  }
  /**
   *
   * @param {String} name Param name.
   * @param {TypeChecking.MessageBuilder.Param} [parent] The parent param.
   * @desc Sets the current param based on a given param name.
   *
   */


  _createClass(MessageBuilder, [{
    key: "setParam",
    value: function setParam(name, parent) {
      this.param = this.methodSignature.getParam(name, parent);
    }
    /**
     *
     * @param {*} value Value to stringify.
     * @returns {String} The "but received..." part of the error message.
     *
     */

  }, {
    key: "buildCustomMessage",

    /**
     *
     * @param {String} customMessage Custom error message.
     * @desc Creates a custom error message.
     * @returns {String} Error message: "Object.method() custom error message."
     *
     */
    value: function buildCustomMessage(customMessage) {
      return "".concat(this.methodSignature, " ").concat(customMessage, ".").trim();
    }
    /**
     *
     * @param {Object} options
     * @param {*} options.value The user input.
     * @param {TypeChecking.Type} options.type The type to check.
     * @param {Array<*>} [options.expectedArgs=[]] Expected arguments, must set to null when an empty string could be valid.
     * @param {Boolean} [options.isNested=false] Whether it is expected nested object.
     * @param {String} [options.customMessage=null] Custom error message.
     * @desc Creates the error message.
     * @returns {String} Error message: "Object.method(param, param2, ...) param expected a type but received input."
     *
     */

  }, {
    key: "buildMessage",
    value: function buildMessage(options) {
      var value = options.value,
          type = options.type,
          _options$expectedArgs = options.expectedArgs,
          expectedArgs = _options$expectedArgs === void 0 ? [] : _options$expectedArgs,
          _options$isNested = options.isNested,
          isNested = _options$isNested === void 0 ? false : _options$isNested,
          _options$customMessag = options.customMessage,
          customMessage = _options$customMessag === void 0 ? null : _options$customMessag;
      var butReceived = MessageBuilder.buildReceived(value);
      var typeExpected = type.toString.apply(type, [isNested, customMessage].concat(_toConsumableArray(expectedArgs)));
      return "".concat(this.methodSignature, " ").concat(this.param, " ").concat(typeExpected, " ").concat(butReceived, ".");
    }
  }], [{
    key: "buildReceived",
    value: function buildReceived(value) {
      var typeName = (0, _util.getValueName)(value, true);
      return "".concat(_config.Config.receivedMessage, " ").concat(typeName);
    }
  }]);

  return MessageBuilder;
}();

exports.MessageBuilder = MessageBuilder;