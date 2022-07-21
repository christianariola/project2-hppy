"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose');

var ObjectId = mongoose.SchemaTypes.ObjectId;
var companySchema = mongoose.Schema(_defineProperty({
  name: {
    type: String,
    required: [false, 'Please add a company name']
  },
  description: {
    type: String,
    required: false
  },
  logo: {
    public_id: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: false
    }
  },
  required: false,
  departments: [{
    deptName: {
      type: String,
      required: [false, "Please add a department name"]
    },
    employees: [{
      employee_id: {
        type: ObjectId,
        ref: "Employee",
        required: false
      },
      firstName: {
        type: String,
        required: false
      },
      lastName: {
        type: String,
        required: false
      },
      email: {
        type: String,
        required: false
      },
      jobTitle: {
        type: String,
        required: false
      },
      isAdmin: {
        type: String,
        required: false,
        "default": false
      },
      isManager: {
        type: String,
        required: false,
        "default": false
      }
    }],
    required: false
  }]
}, "required", false), {
  timestamps: true
});
module.exports = mongoose.model('Company', companySchema);