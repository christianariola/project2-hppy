"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.reset = exports.authSlice = exports.logout = exports.login = exports.addEmployee = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _authService = _interopRequireDefault(require("./authService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Get user from local storage
var employee = JSON.parse(localStorage.getItem("employee"));
var initialState = {
  employee: employee ? employee : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}; // Add new employee

var addEmployee = (0, _toolkit.createAsyncThunk)("auth/addEmployee", function _callee(employee, thunkAPI) {
  var message;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_authService["default"].addEmployee(employee));

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
}); // Login employee

exports.addEmployee = addEmployee;
var login = (0, _toolkit.createAsyncThunk)("auth/login", function _callee2(employee, thunkAPI) {
  var message;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_authService["default"].login(employee));

        case 3:
          return _context2.abrupt("return", _context2.sent);

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          message = _context2.t0.response && _context2.t0.response.data && _context2.t0.response.data.message || _context2.t0.message || _context2.t0.toString();
          return _context2.abrupt("return", thunkAPI.rejectWithValue(message));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
exports.login = login;
var logout = (0, _toolkit.createAsyncThunk)("auth/logout", function _callee3() {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_authService["default"].logout());

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.logout = logout;
var authSlice = (0, _toolkit.createSlice)({
  name: 'auth',
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
    builder.addCase(addEmployee.pending, function (state) {
      state.isLoading = true;
    }).addCase(addEmployee.fulfilled, function (state, action) {
      state.isLoading = false;
      state.isSuccess = true; //disabled causing error on route protection
      //state.employee = action.payload
    }).addCase(addEmployee.rejected, function (state, action) {
      state.isLoading = false;
      state.employee = null;
      state.isError = true;
      state.message = action.payload;
    }).addCase(login.pending, function (state) {
      state.isLoading = true;
    }).addCase(login.fulfilled, function (state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.employee = action.payload;
    }).addCase(login.rejected, function (state, action) {
      state.isLoading = false;
      state.employee = null;
      state.isError = true;
      state.message = action.payload;
    }).addCase(logout.fulfilled, function (state) {
      state.employee = null;
    });
  }
});
exports.authSlice = authSlice;
var reset = authSlice.actions.reset;
exports.reset = reset;
var _default = authSlice.reducer;
exports["default"] = _default;