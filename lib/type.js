"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Type = void 0;

var _config = require("./config");

var _typeCreator = require("./typeCreator");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 * @class TypeChecking.Type
 *
 */
var Type = /*#__PURE__*/function () {
  /**
   *
   * @param {Object} options
   * @param {String} options.assertFunc Assert function in the check-types library.
   * @param {String} [options.singular=''] Message in singular.
   * @param {String} [options.plural=''] Message in plural.
   * @param {Boolean} [options.isArrayOf=false] Whether type is part of "array.of" or not.
   * @param {Boolean} [options.isNullable=false] Whether type is nullable.
   * @param {Boolean} [options.isExpectedArgs=false] If type receives any argument i.e. Types.instanceStrict
   * receives an argument, Types.custom receives two arguments.
   * @param {Function} [options.typeCreator=genericTypeCreator] Function to create type.
   * @param {Function} [options.stringify=(x) => x] Function that stringifies what is expected.
   */
  function Type(options) {
    _classCallCheck(this, Type);

    var assertFunc = options.assertFunc,
        _options$singular = options.singular,
        singular = _options$singular === void 0 ? '' : _options$singular,
        _options$plural = options.plural,
        plural = _options$plural === void 0 ? '' : _options$plural,
        _options$isArrayOf = options.isArrayOf,
        isArrayOf = _options$isArrayOf === void 0 ? false : _options$isArrayOf,
        _options$isNullable = options.isNullable,
        isNullable = _options$isNullable === void 0 ? false : _options$isNullable,
        _options$isExpectedAr = options.isExpectedArgs,
        isExpectedArgs = _options$isExpectedAr === void 0 ? false : _options$isExpectedAr,
        _options$typeCreator = options.typeCreator,
        typeCreator = _options$typeCreator === void 0 ? _typeCreator.genericTypeCreator : _options$typeCreator,
        _options$stringify = options.stringify,
        stringify = _options$stringify === void 0 ? function (x) {
      return x;
    } : _options$stringify;
    var isXExpected = singular.includes('{x}');
    var isYExpected = singular.includes('{y}');
    this.assertFunc = assertFunc;
    this.isArrayOf = isArrayOf;
    this.isNullable = isNullable; // if a type doesn't have a plural property, then do not create an array.of type

    if (isArrayOf && !!plural === false) {
      throw new SyntaxError("Types.array.of.".concat(assertFunc, " - plural expected a non-empty String but received ").concat(plural));
    }

    this.isExpectedArgs = isExpectedArgs || isXExpected || isYExpected;
    this.typeCreator = typeCreator;
    this.stringify = stringify;

    if (isArrayOf) {
      this.baseName = _config.Config.arrayOfMessage;
      this.baseName += plural;
    } else if (singular) {
      this.baseName = singular;
    } else {
      this.baseName = '';
    }
  }

  _createClass(Type, [{
    key: "replaceX",
    value: function replaceX(str, x) {
      return str.replace(/{x}/, this.stringify(x));
    }
  }, {
    key: "replaceY",
    value: function replaceY(str, y) {
      return str.replace(/{y}/, this.stringify(y));
    }
    /**
     *
     * @param {Boolean} [isNested=false] Whether Types.object has nested types.
     * @param {String} [customMessage=null] Custom error message for Types.custom only.
     * @param {*} [x=null] Expected argument for the x slot.
     * @param {*} [y=null] Expected argument for the y slot.
     * @desc Gets the type name as a String, ie: string, array, function, object or class instance.
     * @returns {String}
     *
     */

  }, {
    key: "toString",
    value: function toString() {
      var isNested = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var customMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      if (customMessage != null) {
        if (this.isArrayOf) {
          return "".concat(_config.Config.expectedMessage, " ").concat(_config.Config.arrayOfMessage).concat(customMessage);
        }

        return "".concat(_config.Config.expectedMessage, " ").concat(customMessage);
      }

      var typeName = '';

      if (x != null && y != null) {
        typeName = this.replaceX(this.baseName, x);
        typeName = this.replaceY(typeName, y);
      } else if (x != null) {
        typeName = this.replaceX(this.baseName, x);
      } else if (y != null) {
        typeName = this.replaceY(this.baseName, y);
      } else {
        typeName = this.replaceX(this.baseName, '');
        typeName = this.replaceY(typeName, '');
      }

      if (isNested) {
        typeName += " ".concat(_config.Config.withPropsMessage);
      }

      return "".concat(_config.Config.expectedMessage, " ").concat(typeName.trim());
    }
  }]);

  return Type;
}();

exports.Type = Type;