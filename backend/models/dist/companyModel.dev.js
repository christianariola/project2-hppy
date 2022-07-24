"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose');

var ObjectId = mongoose.SchemaTypes.ObjectId;
var companySchema = mongoose.Schema(_defineProperty({
  name: {
    type: String,
    required: [true, 'Please add a company name']
  },
  description: {
    type: String,
    required: false
  },
  logo: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  required: false,
  departments: [{
    deptName: {
      type: String,
      required: [false, "Please add a department name"]
    },
    manager: [{
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
      }
    }],
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
      }
    }]
  }]
}, "required", false), {
  timestamps: true
});
module.exports = mongoose.model('Company', companySchema);