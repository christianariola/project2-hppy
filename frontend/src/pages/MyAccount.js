import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import TextField from "@mui/material/TextField";

const MyAccount = () => {
  const { employee } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <h2>My Account</h2>
      <p className="account-text">
        My Account informtaion is view-only. You cannot edit this informtaion.
      </p>
      <form>
        <div className="employee-info">
          <ul className="profile-form">
            <li>
              <label>First Name </label>
              <div>
                <TextField
                  disabled
                  defaultValue={employee.firstName}
                  variant="outlined"
                  fullWidth
                ></TextField>
              </div>
            </li>
            <li>
              <label>Last Name </label>
              <div>
                <TextField
                  disabled
                  defaultValue={employee.lastName}
                  fullWidth
                ></TextField>
              </div>
            </li>
          </ul>
          <ul className="profile-form">
            <li>
              <label>Email </label>
              <div>
                <TextField
                  disabled
                  defaultValue={employee.email}
                  fullWidth
                ></TextField>
              </div>
            </li>
            <li>
              <label>Department </label>
              <div>
                <TextField
                  disabled
                  defaultValue={employee.department_name}
                  fullWidth
                ></TextField>
              </div>
            </li>
          </ul>
          <ul className="profile-form">
            <li>
              <label>Employee Number </label>
              <div>
                <TextField
                  disabled
                  defaultValue={employee.employeeNumber}
                  fullWidth
                ></TextField>
              </div>
            </li>
            <li>
              <label>Job Title </label>
              <div>
                <TextField
                  disabled
                  defaultValue={employee.jobTitle}
                  fullWidth
                ></TextField>
              </div>
            </li>
          </ul>
        </div>
        <button className="logoutBtn" onClick={onLogout}>
          Logout
        </button>
      </form>
    </>
  );
};

export default MyAccount;
