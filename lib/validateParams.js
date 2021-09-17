"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateParams = validateParams;

var _util = require("./util");

function validateParams(params) {
  return (0, _util.isObjectTypes)(params);
}