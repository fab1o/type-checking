"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeChecker = void 0;

var _config = require("../config");

var _util = require("../util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @desc The brain for the typecheck function.
 */
var TypeChecker = /*#__PURE__*/function () {
  /**
   * @param {Object} options
   * @param {TypeChecking.MessageBuilder.MessageBuilder} options.messageBuilder - MessageBuilder object.
   * @param {Array|Object} options.input - The user input.
   * @param {Object<TypeChecking.Type>} options.objParams - Params object built with Types.
   * @param {Error} [options.ErrorType=Config.ErrorType] - The Error type to throw.
   */
  function TypeChecker(options) {
    _classCallCheck(this, TypeChecker);

    var messageBuilder = options.messageBuilder,
        input = options.input,
        objParams = options.objParams,
        _options$ErrorType = options.ErrorType,
        ErrorType = _options$ErrorType === void 0 ? _config.Config.ErrorType : _options$ErrorType;
    this.messageBuilder = messageBuilder;
    this.input = input;
    this.objParams = objParams;
    this.ErrorType = ErrorType;
  }
  /**
   * @param {Object} [options]
   * @param {Array|Object} [options.input=this.input] - The user input.
   * @param {Object<TypeChecking.Type>} [options.objParams=this.objParams] - Params object built with Types.
   * @param {TypeChecking.MessageBuilder.Param} [options.parent] - The parent param.
   * @desc Validates object built with Types against user data.
   */


  _createClass(TypeChecker, [{
    key: "execute",
    value: function execute(options) {
      var _this = this;

      var _ref = options || {},
          _ref$input = _ref.input,
          input = _ref$input === void 0 ? this.input : _ref$input,
          _ref$objParams = _ref.objParams,
          objParams = _ref$objParams === void 0 ? this.objParams : _ref$objParams,
          parent = _ref.parent;

      Object.keys(objParams).forEach(function (name, paramIndex) {
        // step 1: get the validator function
        var paramValidate = objParams[name]; // step 2: get the value - [ array, of, arguments ] versus { object: of: arguments }

        var value = (0, _util.getValue)(input, paramIndex, name); // step 3: set the curent param so its name can be in the error message and used on object nesting

        _this.messageBuilder.setCurrentParam(name, parent); // step 4: invoke type's validate function


        paramValidate({
          typeChecker: _this,
          value: value,
          input: input
        });
      });
    }
  }]);

  return TypeChecker;
}();

exports.TypeChecker = TypeChecker;