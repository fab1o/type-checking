"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeCreator = typeCreator;

/**
 *
 * @param {TypeChecking.Type} type Type.
 * @desc Invokes the type creator function.
 * @returns {Function} Typechecker function.
 *
 */
function typeCreator(type) {
  if (type.isExpectedArgs) {
    return function typeCreatorWithArguments() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return type.typeCreator.apply(type, [type].concat(args));
    };
  }

  return type.typeCreator(type);
}