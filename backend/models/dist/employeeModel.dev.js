"use strict";

var _mongoose$Schema;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose');

var ObjectId = mongoose.SchemaTypes.ObjectId;
var employeeSchema = mongoose.Schema((_mongoose$Schema = {
  employeeNumber: {
    type: String,
    required: [true, 'Please add an employee #']
  },
  firstName: {
    type: String,
    required: [true, 'Please add a first name']
  },
  middleName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  role: {
    type: String,
    required: [true, 'Please add a role'],
    unique: true
  },
  jobTitle: {
    type: String,
    required: [true, 'Please add an job title'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  }
}, _defineProperty(_mongoose$Schema, "role", {
  type: String,
  required: [true, 'Please select a role'],
  "default": 'employee'
}), _defineProperty(_mongoose$Schema, "company_id", {
  type: ObjectId,
  ref: "Company",
  required: [true, 'Please add a company id']
}), _defineProperty(_mongoose$Schema, "company_name", {
  type: String,
  required: [true, 'Please add a company name']
}), _defineProperty(_mongoose$Schema, "department_id", {
  type: ObjectId,
  ref: "Company",
  required: [true, 'Please add a department id']
}), _defineProperty(_mongoose$Schema, "department_name", {
  type: String,
  required: [true, 'Please add a department name']
}), _mongoose$Schema), {
  timestamps: true
});
module.exports = mongoose.model('Employee', employeeSchema);