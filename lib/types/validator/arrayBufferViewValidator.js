"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayBufferViewValidator = arrayBufferViewValidator;

function arrayBufferViewValidator(value) {
  return ArrayBuffer.isView(value);
}