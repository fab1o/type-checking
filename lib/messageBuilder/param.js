"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Param = void 0;

var _checkTypes = _interopRequireDefault(require("check-types"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 * @class TypeChecking.MessageBuilder.Param
 *
 */
var Param = /*#__PURE__*/function () {
  /**
   *
   * @param {Object} options
   * @param {String} options.name Parameter name.
   * @param {TypeChecking.MessageBuilder.Param} [options.parent=null] Parent param.
   * @param {Boolean} [options.isNullable=false] Whether param accepts null.
   * @param {Boolean} [options.isOptional=false] Whether should include brackets or not [ ].
   * @param {String} [options.type=null] Type name defined in the optionableTypeCreator.
   * @param {Number} [options.index=null] Position in the params list.
   *
   */
  function Param(options) {
    _classCallCheck(this, Param);

    var name = options.name,
        _options$parent = options.parent,
        parent = _options$parent === void 0 ? null : _options$parent,
        _options$isNullable = options.isNullable,
        isNullable = _options$isNullable === void 0 ? false : _options$isNullable,
        _options$isOptional = options.isOptional,
        isOptional = _options$isOptional === void 0 ? false : _options$isOptional,
        _options$type = options.type,
        type = _options$type === void 0 ? null : _options$type,
        _options$index = options.index,
        index = _options$index === void 0 ? null : _options$index;
    this.name = name;
    this.parent = parent;
    this.optional = isOptional;
    this.type = type;
    this.index = index;
    this.nullable = isNullable;
  }
  /**
   *
   * @param {Object<TypeChecking.Type>} [params={}] Params built with Types.
   * @param {TypeChecking.MessageBuilder.Param} [parent=null] Parent in case of param of param.
   * @desc Converts params built with Types to params built with Param.
   * @returns {Array<TypeChecking.MessageBuilder.Param>} Array of params.
   *
   */


  _createClass(Param, [{
    key: "toString",
    value: function toString() {
      var openBracket = _config.Config.optionalBracketsOn && this.optional ? '[' : '';
      var closBracket = _config.Config.optionalBracketsOn && this.optional ? ']' : '';

      if (_config.Config.parentsOn && this.parent != null) {
        return "".concat(openBracket).concat(this.parent.name, ".").concat(this.name).concat(closBracket);
      }

      return "".concat(openBracket).concat(this.name).concat(closBracket);
    }
  }], [{
    key: "parse",
    value: function parse() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (params === null) {
        return [];
      }

      return Object.keys(params).map(function (name, i) {
        var paramValidate = params[name];

        var isOptional = _checkTypes["default"].not.assigned(paramValidate.optional);

        var type = paramValidate.type;
        var index = parent != null ? i + 10 * parent.index : i;
        return new Param({
          name: name,
          parent: parent,
          isOptional: isOptional,
          type: type,
          index: index
        });
      });
    }
  }]);

  return Param;
}();

exports.Param = Param;