"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildReceivedMessage = buildReceivedMessage;

var _config = require("../config");

var _getValueName = require("../util/getValueName");

function buildReceivedMessage(value) {
  var valueName = (0, _getValueName.getValueName)(value, {
    includeTypeName: true
  });
  return "".concat(_config.Config.receivedMessage, " ").concat(valueName);
}