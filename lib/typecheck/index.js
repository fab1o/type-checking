"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typecheck = require("./typecheck");

Object.keys(_typecheck).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _typecheck[key];
    }
  });
});

var _typecheck2 = require("./typecheck.if");

Object.keys(_typecheck2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _typecheck2[key];
    }
  });
});

var _typecheck3 = require("./typecheck.atLeastOne");

Object.keys(_typecheck3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _typecheck3[key];
    }
  });
});