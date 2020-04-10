"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MethodSignature = void 0;

var _checkTypes = _interopRequireDefault(require("check-types"));

var _config = require("../config");

var _util = require("../util");

var _util2 = require("./util");

var _param = require("./param");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 * @class TypeChecking.MessageBuilder.MethodSignature
 * @desc Builds a method or function signature part of the error message:
 * "method(arg1, arg2, arg3)...", or "method({arg1, arg2, arg3})...", or etc...
 *
 */
var MethodSignature = /*#__PURE__*/function () {
  /**
   *
   * @param {Object} options
   * @param {Object|String} [options.object=null] Class instance or object.
   * @param {Function|String} [options.method=null] Method of the class or a function.
   * @param {Object<TypeChecking.Type>} [options.params=null] Params built with Types.
   * @param {Boolean} [options.isBracketsForced=false] Whether or not to add brackets to params list.
   *
   */
  function MethodSignature(options) {
    _classCallCheck(this, MethodSignature);

    var _options$object = options.object,
        object = _options$object === void 0 ? null : _options$object,
        _options$method = options.method,
        method = _options$method === void 0 ? null : _options$method,
        _options$params = options.params,
        params = _options$params === void 0 ? null : _options$params,
        _options$isBracketsFo = options.isBracketsForced,
        isBracketsForced = _options$isBracketsFo === void 0 ? false : _options$isBracketsFo;

    if (_checkTypes["default"].string(this.object)) {
      this.objectName = this.object;
    } else {
      this.object = object;
    }

    if (_checkTypes["default"].string(this.method)) {
      this.methodName = this.method;
    } else {
      this.method = method;
    } // whether or not it should add three dots to the list of param names to represent that it inherits more params


    this.hasSuperclass = (0, _util2.hasSuperclass)(object);
    this.params = _param.Param.parse(params);
    this.params.toString = this.getArrayParamNames.bind(this);
    this.isBracketsForced = isBracketsForced;
  }
  /**
   *
   * @desc Gets an Object's method or function name.
   * @returns {String} The "Object.method..." part of the message.
   *
   */


  _createClass(MethodSignature, [{
    key: "replaceObjectParams",

    /**
     *
     * @param {Number} i Position in the list of params, must be a positive number.
     * @param {Object<TypeChecking.Type>} [params={}] List of params.
     * @param {Boolean} [isArrayOf=false] Helps identify that an object is enclosed by an array.
     * @desc Replaces a param from this.params with a new given list of params.
     * @returns {TypeChecking.MessageBuilder.Param} The param that was replaced.
     *
     */
    value: function replaceObjectParams(i) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var isArrayOf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (i >= 0) {
        var parent = this.params[i];
        this.params.splice(i, 1, _param.Param.parse(params, parent));
        this.params[i].isArrayOf = isArrayOf;
        return parent;
      }

      return null;
    }
    /**
     *
     * @param {String} name Name of param.
     * @param {Array<TypeChecking.MessageBuilder.Param>} [params=this.params] List of params.
     * @desc Gets the parent of a param from a list of parameters.
     * @returns {TypeChecking.MessageBuilder.Param|null} The param found in the given list.
     *
     */

  }, {
    key: "getParamParent",
    value: function getParamParent() {
      var _this$getParam;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_this$getParam = this.getParam(args)) === null || _this$getParam === void 0 ? void 0 : _this$getParam.parent;
    }
    /**
     *
     * @param {String} name Name of param.
     * @param {TypeChecking.MessageBuilder.Param} [parent=null] The parent param.
     * @param {Array<TypeChecking.MessageBuilder.Param>} [params=this.params] List of params.
     * @desc Gets a param from a list of parameters.
     * @returns {TypeChecking.MessageBuilder.Param|null} The param found in the given list.
     *
     */

  }, {
    key: "getParam",
    value: function getParam(name) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.params;
      var param = null;

      for (var i = 0; i < params.length; i++) {
        param = params[i];

        if (_checkTypes["default"].array(param)) {
          param = this.getParam(name, parent, param);
        }

        if (param != null && param.name === name && param.parent === parent) {
          break;
        }
      }

      return param;
    }
    /**
     *
     * @param {Array<TypeChecking.MessageBuilder.Param>} [params=this.params] List of params.
     * @desc Gets a string with a list of parameter names.
     * @returns {Array<String>} A string that represents the full list of param names.
     *
     */

  }, {
    key: "getArrayParamNames",
    value: function getArrayParamNames() {
      var _this = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;
      var paramsList = params.map(function (param) {
        return _this.getParamNames(param);
      });
      var openBracket = this.isBracketsForced ? '{ ' : '';
      var closBracket = this.isBracketsForced ? ' }' : '';
      return "".concat(openBracket).concat(paramsList.join(', ')).concat(closBracket);
    }
    /**
     *
     * @param {Array<TypeChecking.MessageBuilder.Param>} params List of params.
     * @desc Gets a string with a list of parameter names.
     * @returns {String} A string that represents a sub-set list of param names.
     *
     */

  }, {
    key: "getParamNames",
    value: function getParamNames(params) {
      if (_checkTypes["default"].not.array(params)) {
        // params could also not be an array and just be 1 param
        return "".concat(params.name);
      } // params is an "options" object


      var parentParams = _config.Config.etceteraOn && this.hasSuperclass ? ', ...' : ''; // helps identify that an object is enclosed by an array

      var openBracket = params.isArrayOf ? '[' : '';
      var closBracket = params.isArrayOf ? ']' : '';
      return "".concat(openBracket, "{ ").concat(this.getArrayParamNames(params)).concat(parentParams, " }").concat(closBracket);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.name).concat(this.parameters);
    }
  }, {
    key: "name",
    get: function get() {
      if (_checkTypes["default"].not.assigned(this.objectName)) {
        this.objectName = this.object != null ? "".concat((0, _util.getTypeName)(this.object)) : '';
      }

      if (_checkTypes["default"].not.assigned(this.methodName)) {
        this.methodName = this.method != null ? "".concat((0, _util.getTypeName)(this.method)) : '';
      }

      var dot = _checkTypes["default"].nonEmptyString(this.objectName) && _checkTypes["default"].nonEmptyString(this.methodName) ? '.' : '';
      return "".concat(this.objectName).concat(dot).concat(this.methodName);
    }
    /**
     *
     * @desc Gets a full list of parameters between brackets.
     * @returns {String} The "(param1, param2, ...)" part of the message.
     *
     */

  }, {
    key: "parameters",
    get: function get() {
      var hasMethod = this.name.length > 0;
      var openBracket = hasMethod ? '(' : this.params.length > 0 ? '{' : '';
      var closBracket = hasMethod ? ')' : this.params.length > 0 ? '}' : '';
      return "".concat(openBracket).concat(this.params).concat(closBracket);
    }
  }]);

  return MethodSignature;
}();

exports.MethodSignature = MethodSignature;