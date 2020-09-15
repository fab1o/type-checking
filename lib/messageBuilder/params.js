"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Params = void 0;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

var _config = require("../config");

var _param = require("./param");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @desc Collection of parameters
 */
var Params = /*#__PURE__*/function () {
  /**
   * @param {Object<TypeChecking.Type>} [objParams] - Object built with Types.
   * @param {Object} options
   * @param {TypeChecking.MessageBuilder.Param} [options.parent] - Parent of the collection of parameters.
   * @param {Boolean} [options.displayEtcetera=false] - Whether or not to display "...".
   * @param {Boolean} [options.displayBrackets=false] - Whether or not to display brackets "{ }".
   */
  function Params(objParams, options) {
    _classCallCheck(this, Params);

    var _ref = options || {},
        parent = _ref.parent,
        _ref$displayEtcetera = _ref.displayEtcetera,
        displayEtcetera = _ref$displayEtcetera === void 0 ? false : _ref$displayEtcetera,
        _ref$displayBrackets = _ref.displayBrackets,
        displayBrackets = _ref$displayBrackets === void 0 ? false : _ref$displayBrackets;

    if (_checkTypes["default"].object(objParams)) {
      this.params = Params.toArray(objParams, parent);
    } else {
      this.params = [];
    }

    this.displayBrackets = displayBrackets;
    this.displayEtcetera = displayEtcetera;
    this.atLeastOne = false;
  }
  /**
   * @desc Length of the collection.
   * @returns {Number}
   */


  _createClass(Params, [{
    key: "map",

    /**
     * @param {Function} func
     * @desc Creates a new array populated with the results of calling a provided function on every param.
     * @returns {Array<TypeChecking.MessageBuilder.Param>}
     */
    value: function map(func) {
      return this.params.map(func);
    }
    /**
     * @param {Number} index
     * @desc Gets an item of the collection.
     * @returns {TypeChecking.MessageBuilder.Param|undefined}
     */

  }, {
    key: "get",
    value: function get(index) {
      return this.params[index];
    }
    /**
     * @param {Object<TypeChecking.Type>} [objParams] - Params built with Types.
     * @param {TypeChecking.MessageBuilder.Param} [parent=null] - Parent in case of Param of Param.
     * @desc Converts Params built with Types to an Array of Params.
     * @returns {Array<TypeChecking.MessageBuilder.Param>} Array of parameters.
     *
     */

  }, {
    key: "toString",

    /**
     * @param {TypeChecking.MessageBuilder.Params} [params=this.params] - Collection of parameters.
     * @desc Gets a string with a list of parameter names.
     * @returns {String} A string that represents the full list of Param names by a given array of Params.
     */
    value: function toString() {
      var _this = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;
      var paramsList = params.map(function (param) {
        return _this.stringify(param);
      });
      var openBracket = this.displayBrackets && this.atLeastOne ? '{ ' : '';
      var closBracket = this.displayBrackets && this.atLeastOne ? ' }' : '';
      return "".concat(openBracket).concat(paramsList.join(', ')).concat(closBracket);
    }
    /**
     * @param {TypeChecking.MessageBuilder.Param} param - A param.
     * @desc Gets a string with a list of parameter names.
     * @returns {String} A string that represents the Param name or a sub-set list of param names, children of a given Param.
     */

  }, {
    key: "stringify",
    value: function stringify(param) {
      // params with no children
      if (_checkTypes["default"].not.assigned(param.params)) {
        return "".concat(param.name);
      } // params is an "options" object


      var parentParams = _config.Config.etceteraOn && this.displayEtcetera ? ', ...' : ''; // helps identify that an object is enclosed by an array

      var openBracket = param.isArray ? '[' : '';
      var closBracket = param.isArray ? ']' : '';
      var arrayParamNames = this.toString(param.params);
      return "".concat(openBracket, "{ ").concat(arrayParamNames).concat(parentParams, " }").concat(closBracket);
    }
  }, {
    key: "length",
    get: function get() {
      return this.params.length;
    }
    /**
     * @desc Whether at least one parameter is required in the collection.
     * @returns {Boolean}
     */

  }, {
    key: "isSomeParamRequired",
    get: function get() {
      return this.params.some(function (p) {
        return p.isRequired;
      });
    }
    /**
     * @desc Whether every parameter in the collection is non-required (either Optional or Undefinable).
     * @returns {Boolean}
     */

  }, {
    key: "isEveryParamNonRequired",
    get: function get() {
      return this.length > 0 && this.params.every(function (p) {
        return p.isNonRequired;
      });
    }
  }], [{
    key: "toArray",
    value: function toArray(objParams) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (objParams == null) {
        return [];
      }

      return Object.keys(objParams).map(function (name) {
        var paramValidate = objParams[name];

        if (!paramValidate) {
          var par = parent != null ? "".concat(parent.name, ".") : '';
          throw SyntaxError("Types: ".concat(par).concat(name, " expected a valid type from Types."));
        }

        var typeName = paramValidate.typeName,
            isNullable = paramValidate.isNullable,
            isOptional = paramValidate.isOptional,
            isUndefinable = paramValidate.isUndefinable;
        return new _param.Param({
          name: name,
          parent: parent,
          isNullable: isNullable,
          isOptional: isOptional,
          isUndefinable: isUndefinable,
          typeName: typeName
        });
      });
    }
  }]);

  return Params;
}();

exports.Params = Params;