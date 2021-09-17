"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineProperty = defineProperty;

function defineProperty(obj, propName, value) {
  Object.defineProperty(obj, propName, {
    value: value,
    writable: false,
    configurable: false
  });
}