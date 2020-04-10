"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getValueName = require("./getValueName");

Object.keys(_getValueName).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getValueName[key];
    }
  });
});

var _hasSuperclass = require("./hasSuperclass");

Object.keys(_hasSuperclass).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hasSuperclass[key];
    }
  });
});