"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Param = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Param = function () {
  function Param(options) {
    _classCallCheck(this, Param);
    var name = options.name,
      _options$parent = options.parent,
      parent = _options$parent === void 0 ? null : _options$parent,
      _options$isOptional = options.isOptional,
      isOptional = _options$isOptional === void 0 ? false : _options$isOptional;
    this.name = name;
    this.parent = parent;
    this.isOptional = isOptional;
    this.isArray = false;
    this.params = null;
  }
  _createClass(Param, [{
    key: "isRequired",
    get: function get() {
      return this.isOptional === false;
    }
  }, {
    key: "isNonRequired",
    get: function get() {
      return this.isOptional;
    }
  }, {
    key: "extension",
    get: function get() {
      if (this.isOptional) {
        return ' or null or undefined';
      }
      return '';
    }
  }, {
    key: "toString",
    value: function toString() {
      var par = this.parent != null ? "".concat(this.parent.name, ".") : '';
      return "".concat(par).concat(this.name);
    }
  }]);
  return Param;
}();
exports.Param = Param;