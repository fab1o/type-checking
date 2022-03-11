"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Type = void 0;

var _stringify = require("../util/stringify");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Type = function () {
  function Type(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Type);

    var _ref = options !== null && options !== void 0 ? options : {},
        _ref$assert = _ref.assert,
        assert = _ref$assert === void 0 ? name : _ref$assert,
        _ref$singular = _ref.singular,
        singular = _ref$singular === void 0 ? name : _ref$singular,
        _ref$plural = _ref.plural,
        plural = _ref$plural === void 0 ? "".concat(name, "s") : _ref$plural,
        _ref$isArray = _ref.isArray,
        isArray = _ref$isArray === void 0 ? false : _ref$isArray,
        _ref$expectArgs = _ref.expectArgs,
        expectArgs = _ref$expectArgs === void 0 ? false : _ref$expectArgs,
        _ref$isExtensible = _ref.isExtensible,
        isExtensible = _ref$isExtensible === void 0 ? true : _ref$isExtensible,
        _ref$isArrayable = _ref.isArrayable,
        isArrayable = _ref$isArrayable === void 0 ? true : _ref$isArrayable,
        _ref$autoDisplayArgs = _ref.autoDisplayArgs,
        autoDisplayArgs = _ref$autoDisplayArgs === void 0 ? true : _ref$autoDisplayArgs,
        firstType = _ref.firstType,
        validator = _ref.validator,
        operator = _ref.operator,
        _ref$validateCreator = _ref.validateCreator,
        validateCreator = _ref$validateCreator === void 0 ? function () {
      return false;
    } : _ref$validateCreator,
        _ref$stringifyArgs = _ref.stringifyArgs,
        stringifyArgs = _ref$stringifyArgs === void 0 ? function (x) {
      return (0, _stringify.stringify)(x);
    } : _ref$stringifyArgs;

    this.name = name;
    this.assert = assert;
    this.plural = plural;
    this.isArray = isArray;

    if (isArray) {
      this.singular = "an Array of ".concat(this.plural);
    } else {
      this.singular = singular;
    }

    this.firstType = firstType;
    this.validator = validator;
    this.expectArgs = !!expectArgs;
    this.isExtensible = !!isExtensible;
    this.isArrayable = !!isArrayable;
    this.autoDisplayArgs = !!autoDisplayArgs;
    this.operator = operator;
    this.validateCreator = validateCreator;
    this.stringifyArgs = stringifyArgs;
  }

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
  }, {
    key: "toString",
    value: function toString() {
      var _this = this;

      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.name;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (this.name === 'custom') {
        return message;
      }

      var typeName = this.singular;

      if (/{[a-k]}/.test(typeName)) {
        ['a', 'b', 'c', 'd', 'e', 'f'].forEach(function (letter, index) {
          var arg = args[index];

          if (arg !== undefined) {
            var argName = _this.stringifyArgs(arg);

            typeName = typeName.replace(new RegExp("{".concat(letter, "}"), 'i'), argName).trim();
          } else {
            typeName = typeName.replace(new RegExp("{".concat(letter, "}"), 'i'), '').trim();
          }
        });
      } else if (this.autoDisplayArgs && args.length > 0) {
        var argNames = args.map(function (arg) {
          return "".concat(_this.stringifyArgs(arg));
        }).join();
        typeName += ": ".concat(argNames);
      }

      return typeName;
    }
  }]);

  return Type;
}();

exports.Type = Type;