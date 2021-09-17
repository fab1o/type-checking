"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeChecker = require("./typeChecker");

Object.keys(_typeChecker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _typeChecker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _typeChecker[key];
    }
  });
});

var _typeChecker2 = require("./typeChecker.atLeastOne");

Object.keys(_typeChecker2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _typeChecker2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _typeChecker2[key];
    }
  });
});