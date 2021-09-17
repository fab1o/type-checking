"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Param = void 0;

var _config = require("../config");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Param = function () {
  function Param(options) {
    _classCallCheck(this, Param);

    var name = options.name,
        _options$parent = options.parent,
        parent = _options$parent === void 0 ? null : _options$parent,
        _options$isNullable = options.isNullable,
        isNullable = _options$isNullable === void 0 ? false : _options$isNullable,
        _options$isOptional = options.isOptional,
        isOptional = _options$isOptional === void 0 ? false : _options$isOptional,
        _options$isUndefinabl = options.isUndefinable,
        isUndefinable = _options$isUndefinabl === void 0 ? false : _options$isUndefinabl;
    this.name = name;
    this.parent = parent;
    this.isNullable = isNullable;
    this.isOptional = isOptional;
    this.isUndefinable = isUndefinable;
    this.isArray = false;
    this.params = null;
  }

  _createClass(Param, [{
    key: "isRequired",
    get: function get() {
      return this.isOptional === false && this.isUndefinable === false;
    }
  }, {
    key: "isNonRequired",
    get: function get() {
      return this.isOptional || this.isUndefinable;
    }
  }, {
    key: "extension",
    get: function get() {
      if (_config.Config.displayParamExt === false) {
        return '';
      }

      if (this.isOptional) {
        return ' or null or undefined';
      }

      if (this.isNullable) {
        return ' or null';
      }

      if (this.isUndefinable) {
        return ' or undefined';
      }

      return '';
    }
  }, {
    key: "toString",
    value: function toString() {
      var par = _config.Config.parentsOn && this.parent != null ? "".concat(this.parent.name, ".") : '';
      return "".concat(par).concat(this.name);
    }
  }]);

  return Param;
}();

exports.Param = Param;