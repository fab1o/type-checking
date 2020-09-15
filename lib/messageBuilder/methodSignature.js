"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MethodSignature = void 0;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

var _util = require("../util");

var _params = require("./params");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @desc Signature of a method or function or stand-alone object (initial part of the error message).
 */
var MethodSignature = /*#__PURE__*/function () {
  /**
   * @param {Object} options
   * @param {Object|String} [options.object=null] - Class instance or object.
   * @param {Function|String} [options.method=null] - Method of the class or a function.
   * @param {Object<TypeChecking.Type>} [options.objParams=null] - Object built with Types.
   * @param {Boolean} [options.displayBrackets=false] - Whether or not to display brackets { }.
   *
   */
  function MethodSignature(options) {
    _classCallCheck(this, MethodSignature);

    var _options$object = options.object,
        object = _options$object === void 0 ? null : _options$object,
        _options$method = options.method,
        method = _options$method === void 0 ? null : _options$method,
        _options$objParams = options.objParams,
        objParams = _options$objParams === void 0 ? null : _options$objParams,
        displayBrackets = options.displayBrackets;
    this.name = {
      object: object,
      method: method
    }; // Whether or not it should add three dots to the list of param names to represent that it inherits more params.

    var displayEtcetera = (0, _util.hasSuperclass)(object);
    this.params = new _params.Params(objParams, {
      displayEtcetera: displayEtcetera,
      displayBrackets: displayBrackets
    });
  }
  /**
   * @desc Sets the method signature name.
   * @param {Object} opt
   * @param {Object|String} [opt.object=null] - Class instance or object.
   * @param {Function|String} [opt.method=null] - Method of the class or a function.
   */


  _createClass(MethodSignature, [{
    key: "findParam",

    /**
     * @param {String} name Name of param.
     * @param {TypeChecking.MessageBuilder.Param} [parent=null] - The parent param.
     * @param {TypeChecking.MessageBuilder.Params} [params=parent?.params || this.params] - Collection of parameters.
     * @desc Gets a param from a list of parameters.
     * @throws {ReferenceError} Internal failure.
     * @returns {TypeChecking.MessageBuilder.Param} The param found in the given params list.
     */
    value: function findParam(name) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (parent === null || parent === void 0 ? void 0 : parent.params) || this.params;
      var param = null;

      for (var i = 0; i < params.length; i++) {
        param = params.get(i);

        if (_checkTypes["default"].instanceStrict(param, _params.Params)) {
          param = this.findParam(name, parent, param);
        }

        if (param != null && param.name === name && param.parent === parent) {
          break;
        }
      }

      if (param == null) {
        // should never have to throw this error
        throw ReferenceError("findParam(...) not able to find param: ".concat(name, "."));
      }

      return param;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.name).concat(this.parameters);
    }
  }, {
    key: "name",
    set: function set(opt) {
      var objectName = (0, _util.getTypeName)(opt.object, '');
      var methodName = (0, _util.getTypeName)(opt.method, '');
      var dot;

      if (_checkTypes["default"].nonEmptyString(objectName) && _checkTypes["default"].nonEmptyString(methodName)) {
        dot = '.';
      } else {
        dot = '';
      }

      this._name = "".concat(objectName).concat(dot).concat(methodName);
    }
    /**
     * @desc Gets the method signature name.
     * @returns {String} The "Object.method..." part of the message.
     */
    ,
    get: function get() {
      return this._name;
    }
    /**
     * @desc Gets a full list of parameters between brackets.
     * @returns {String} The "(param1, param2, ...)" part of the message.
     */

  }, {
    key: "parameters",
    get: function get() {
      var openBracket = '';
      var closBracket = '';

      if (_checkTypes["default"].nonEmptyString(this.name)) {
        // methodName(...)
        openBracket = '(';
        closBracket = ')';
      } else if (this.params.length > 0) {
        // {...}
        openBracket = '{';
        closBracket = '}';
      }

      return "".concat(openBracket).concat(this.params).concat(closBracket);
    }
  }]);

  return MethodSignature;
}();

exports.MethodSignature = MethodSignature;