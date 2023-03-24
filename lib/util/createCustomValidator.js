"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCustomValidator = createCustomValidator;
var _validateCreator = require("../validateCreator");
function createCustomValidator(type) {
  var validator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return false;
  };
  var message = arguments.length > 2 ? arguments[2] : undefined;
  if (type.expectArgs) {
    var validateWithArguments = function validateWithArguments() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _validateCreator.customValidateCreator.apply(void 0, [type, validator, message].concat(args));
    };
    return validateWithArguments.bind(type);
  }
  return (0, _validateCreator.customValidateCreator)(type, validator, message);
}