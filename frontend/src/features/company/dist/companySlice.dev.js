"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.reset = exports.companySlice = exports.deleteEmployee = exports.getEmployee = exports.deleteCompany = exports.editCompany = exports.getCompany = exports.getCompanyList = exports.addCompany = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _companyService = _interopRequireDefault(require("./companyService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initialState = {
  company: {},
  employee: '',
  companyList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}; // Add new company

var addCompany = (0, _toolkit.createAsyncThunk)("company/addCompany", function _callee(company, thunkAPI) {
  var message;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_companyService["default"].addCompany(company));

        case 3:
          return _context.abrupt("return", _context.sent);

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          message = _context.t0.response && _context.t0.response.data && _context.t0.response.data.message || _context.t0.message || _context.t0.toString();
          return _context.abrupt("return", thunkAPI.rejectWithValue(message));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
}); // Fetch company list

exports.addCompany = addCompany;
var getCompanyList = (0, _toolkit.createAsyncThunk)("company/getCompanyList", function _callee2(company, thunkAPI) {
  var response, message;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_companyService["default"].getCompanyList());

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          message = _context2.t0.response && _context2.t0.response.data && _context2.t0.response.data.message || _context2.t0.message || _context2.t0.toString();
          return _context2.abrupt("return", thunkAPI.rejectWithValue(message));

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Fetch company by id

exports.getCompanyList = getCompanyList;
var getCompany = (0, _toolkit.createAsyncThunk)("company/getCompany", function _callee3(companyId, thunkAPI) {
  var message;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_companyService["default"].getCompany(companyId));

        case 3:
          return _context3.abrupt("return", _context3.sent);

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          message = _context3.t0.response && _context3.t0.response.data && _context3.t0.response.data.message || _context3.t0.message || _context3.t0.toString();
          return _context3.abrupt("return", thunkAPI.rejectWithValue(message));

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
}); // Edit company by id

exports.getCompany = getCompany;
var editCompany = (0, _toolkit.createAsyncThunk)("company/editCompany", function _callee4(_ref, thunkAPI) {
  var companyId, updatedCompanyData, message;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          companyId = _ref.companyId, updatedCompanyData = _ref.updatedCompanyData;
          console.log(updatedCompanyData);
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(_companyService["default"].editCompany(updatedCompanyData, companyId));

        case 5:
          return _context4.abrupt("return", _context4.sent);

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](2);
          message = _context4.t0.response && _context4.t0.response.data && _context4.t0.response.data.message || _context4.t0.message || _context4.t0.toString();
          return _context4.abrupt("return", thunkAPI.rejectWithValue(message));

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 8]]);
}); // Delete company by id

exports.editCompany = editCompany;
var deleteCompany = (0, _toolkit.createAsyncThunk)("company/deleteCompany", function _callee5(companyId, thunkAPI) {
  var message;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_companyService["default"].deleteCompany(companyId));

        case 3:
          return _context5.abrupt("return", _context5.sent);

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          message = _context5.t0.response && _context5.t0.response.data && _context5.t0.response.data.message || _context5.t0.message || _context5.t0.toString();
          return _context5.abrupt("return", thunkAPI.rejectWithValue(message));

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
exports.deleteCompany = deleteCompany;
var getEmployee = (0, _toolkit.createAsyncThunk)("company/getEmployee", function _callee6(empId, thunkAPI) {
  var message;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_companyService["default"].getEmployee(empId));

        case 3:
          return _context6.abrupt("return", _context6.sent);

        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](0);
          message = _context6.t0.response && _context6.t0.response.data && _context6.t0.response.data.message || _context6.t0.message || _context6.t0.toString();
          return _context6.abrupt("return", thunkAPI.rejectWithValue(message));

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
exports.getEmployee = getEmployee;
var deleteEmployee = (0, _toolkit.createAsyncThunk)("company/deleteEmployee", function _callee7(_ref2, thunkAPI) {
  var empId, compempId, message;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          empId = _ref2.empId, compempId = _ref2.compempId;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(_companyService["default"].deleteEmployee(empId, compempId));

        case 4:
          return _context7.abrupt("return", _context7.sent);

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](1);
          message = _context7.t0.response && _context7.t0.response.data && _context7.t0.response.data.message || _context7.t0.message || _context7.t0.toString();
          return _context7.abrupt("return", thunkAPI.rejectWithValue(message));

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
exports.deleteEmployee = deleteEmployee;
var companySlice = (0, _toolkit.createSlice)({
  name: 'company',
  initialState: initialState,
  reducers: {
    reset: function reset(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(addCompany.pending, function (state) {
      state.isLoading = true;
    }).addCase(addCompany.fulfilled, function (state, action) {
      state.isLoading = false;
      state.isSuccess = true;
    }).addCase(addCompany.rejected, function (state, action) {
      state.isLoading = false;
      state.company = null;
      state.isError = true;
      state.message = action.payload;
    }).addCase(getCompanyList.pending, function (state) {
      state.isLoading = true;
    }).addCase(getCompanyList.fulfilled, function (state, action) {
      state.isLoading = false;
      state.companyList = action.payload;
    }).addCase(getCompanyList.rejected, function (state, action) {
      state.isLoading = false;
      state.compay = null;
      state.isError = true;
      state.message = action.payload;
    }).addCase(getCompany.fulfilled, function (state, action) {
      state.company = action.payload;
    }).addCase(getCompany.rejected, function (state, action) {
      state.isLoading = false;
      state.company = null;
      state.isError = true;
      state.message = action.payload;
    }).addCase(editCompany.fulfilled, function (state, action) {
      state.company = action.payload;
      console.log("action", action);
      var id = action.meta.arg.id;

      if (id) {
        state.companyList = state.companyList.map(function (item) {
          return item._id === id ? action.payload : item;
        });
      }
    }).addCase(editCompany.rejected, function (state, action) {
      state.isLoading = false;
      state.company = null;
      state.isError = true;
      state.message = action.payload;
    }).addCase(deleteCompany.fulfilled, function (state, action) {
      state.company = action.payload;
      var arg = action.meta.arg;

      if (arg) {
        state.companyList = state.companyList.filter(function (item) {
          return item._id !== arg;
        });
      }
    }).addCase(deleteCompany.rejected, function (state, action) {
      state.isLoading = false;
      state.company = null;
      state.isError = true;
      state.message = action.payload;
    }).addCase(getEmployee.fulfilled, function (state, action) {
      state.isLoading = false;
      state.employee = action.payload;
    }).addCase(getEmployee.rejected, function (state, action) {
      state.isLoading = false;
      state.employee = null;
      state.isError = true;
      state.message = action.payload;
    }).addCase(deleteEmployee.fulfilled, function (state, action) {
      state.company = action.payload; // const { arg } = action.meta
      // if( arg ){
      //     state.companyList = state.companyList.filter((item) => item._id !== arg)
      // }
    }).addCase(deleteEmployee.rejected, function (state, action) {
      state.isLoading = false;
      state.company = null;
      state.isError = true;
      state.message = action.payload;
    });
  }
});
exports.companySlice = companySlice;
var reset = companySlice.actions.reset;
exports.reset = reset;
var _default = companySlice.reducer;
exports["default"] = _default;