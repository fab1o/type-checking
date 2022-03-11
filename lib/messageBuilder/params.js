"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Params = void 0;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

var _param = require("./param");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Params = function () {
  function Params(objParams, options) {
    _classCallCheck(this, Params);

    var _ref = options !== null && options !== void 0 ? options : {},
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

  _createClass(Params, [{
    key: "length",
    get: function get() {
      return this.params.length;
    }
  }, {
    key: "isSomeParamRequired",
    get: function get() {
      return this.params.some(function (p) {
        return p.isRequired;
      });
    }
  }, {
    key: "isEveryParamNonRequired",
    get: function get() {
      return this.length > 0 && this.params.every(function (p) {
        return p.isNonRequired;
      });
    }
  }, {
    key: "map",
    value: function map(func) {
      return this.params.map(func);
    }
  }, {
    key: "get",
    value: function get(index) {
      return this.params[index];
    }
  }, {
    key: "toString",
    value: function toString() {
      var _this = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;
      var paramsList = params.map(function (param) {
        return _this.stringify(param);
      });
      var openBracket = this.displayBrackets && this.atLeastOne ? '{' : '';
      var closBracket = this.displayBrackets && this.atLeastOne ? '}' : '';
      return "".concat(openBracket).concat(paramsList.join(', ')).concat(closBracket);
    }
  }, {
    key: "stringify",
    value: function stringify(param) {
      if (_checkTypes["default"].not.assigned(param.params)) {
        return "".concat(param.name);
      }

      var parentParams = this.displayEtcetera ? ', ...' : '';
      var openBracket = param.isArray ? '[' : '';
      var closBracket = param.isArray ? ']' : '';
      var arrayParamNames = this.toString(param.params);
      return "".concat(openBracket, "{").concat(arrayParamNames).concat(parentParams, "}").concat(closBracket);
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
        var isOptional = paramValidate.isOptional;
        return new _param.Param({
          name: name,
          parent: parent,
          isOptional: isOptional
        });
      });
    }
  }]);

  return Params;
}();

exports.Params = Params;