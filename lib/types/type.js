"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Type = void 0;

var _config = require("../config");

var _validateCreator = require("../validateCreator");

var _util = require("../util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @desc Type used to validate params.
 */
var Type = /*#__PURE__*/function () {
  /**
   * @param {String} name - Name could be the assert name in the check-types library.
   * @param {Object} [options={}]
   * @param {String} [options.singular] - Name in singular.
   * @param {String} [options.plural] - Name in plural.
   * @param {Boolean} [options.isArray=false] - Whether type is part of "array.of" or not.
   * @param {Boolean} [options.expectArgs=false] - Whether type expects an argument or not.
   * @param {Boolean} [options.autoDisplayArgs=true] - Whether or not automatically display arguments.
   * @param {Function} [options.stringify=getArgumentValueName] - A function to replace the default stringify function for the arguments: x and y.
   * @param {Function} [options.validateCreator=genericValidateCreator] - A function to replace the generic type creator function.
   */
  function Type(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Type);

    var _options$singular = options.singular,
        singular = _options$singular === void 0 ? name : _options$singular,
        _options$plural = options.plural,
        plural = _options$plural === void 0 ? "".concat(name, "s") : _options$plural,
        _options$isArray = options.isArray,
        isArray = _options$isArray === void 0 ? false : _options$isArray,
        _options$expectArgs = options.expectArgs,
        expectArgs = _options$expectArgs === void 0 ? false : _options$expectArgs,
        _options$autoDisplayA = options.autoDisplayArgs,
        autoDisplayArgs = _options$autoDisplayA === void 0 ? true : _options$autoDisplayA,
        _options$stringify = options.stringify,
        stringify = _options$stringify === void 0 ? _util.getArgumentValueName : _options$stringify,
        _options$validateCrea = options.validateCreator,
        validateCreator = _options$validateCrea === void 0 ? _validateCreator.genericValidateCreator : _options$validateCrea;
    this.name = name;
    this.singular = singular || name;
    this.plural = plural || "".concat(name, "s");
    this.isArray = !!isArray;
    this.expectArgs = !!expectArgs;
    this.autoDisplayArgs = !!autoDisplayArgs;
    this.stringify = stringify || _util.getArgumentValueName;
    this.validateCreator = validateCreator || _validateCreator.genericValidateCreator;
  }
  /**
   * @desc Creates a type validator.
   * @returns {Function} - Validator function.
   */


  _createClass(Type, [{
    key: "createValidator",
    value: function createValidator() {
      if (this.expectArgs) {
        var validateWithArguments = function validateWithArguments() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return this.validateCreator.apply(this, [this].concat(args));
        };

        return validateWithArguments.bind(this);
      }

      return this.validateCreator(this);
    }
    /**
     * @param {Function} [validator=() => false] - Custom function that validates input, must return boolean.
     * @param {String} [message] - Error message that describes what is expected.
     * @desc Creates a custom type validator.
     * @returns {Function} Validator function.
     */

  }, {
    key: "createCustomValidator",
    value: function createCustomValidator(validator, message) {
      if (this.expectArgs) {
        var validateWithArguments = function validateWithArguments() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return _validateCreator.customValidateCreator.apply(void 0, [this, validator, message].concat(args));
        };

        return validateWithArguments.bind(this);
      }

      return (0, _validateCreator.customValidateCreator)(this, validator, message);
    }
    /**
     * @param {String} [message=this.name] - Custom error message.
     * @param {*} [args] - Expected arguments.
     * @desc Gets the type name as a String, ie: string, array, function, object or class instance.
     * @returns {String}
     */

  }, {
    key: "toString",
    value: function toString() {
      var _this = this;

      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.name;

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      if (this.name === 'custom') {
        return message;
      }

      var typeName;

      if (this.isArray && this.plural) {
        typeName = "".concat(_config.Config.arrayOfMessage, " ").concat(this.plural);
      } else if (this.singular) {
        typeName = this.singular;
      } else {
        typeName = '';
      }

      if (/{[a-k]}/.test(typeName)) {
        // a max of 6 arguments are supported for user defined template
        ['a', 'b', 'c', 'd', 'e', 'f'].forEach(function (letter, i) {
          var arg = args[i];

          if (arg !== undefined) {
            typeName = typeName.replace(new RegExp("{".concat(letter, "}"), 'i'), _this.stringify(arg)).trim();
          } else {
            typeName = typeName.replace(new RegExp("{".concat(letter, "}"), 'i'), '').trim();
          }
        });
      } else if (this.autoDisplayArgs && args.length > 0) {
        var argNames = args.map(function (arg) {
          return "".concat(_this.stringify(arg));
        }).join();
        typeName += ": ".concat(argNames);
      }

      return typeName;
    }
  }]);

  return Type;
}();

exports.Type = Type;