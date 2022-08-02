"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Input = _interopRequireDefault(require("./Input"));

var _RadioGroup = _interopRequireDefault(require("./RadioGroup"));

var _Select = _interopRequireDefault(require("./Select"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _DatePicker = _interopRequireDefault(require("./DatePicker"));

var _Button = _interopRequireDefault(require("./Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Controls = {
  Input: _Input["default"],
  RadioGroup: _RadioGroup["default"],
  Select: _Select["default"],
  Checkbox: _Checkbox["default"],
  DatePicker: _DatePicker["default"],
  Button: _Button["default"]
};
var _default = Controls;
exports["default"] = _default;