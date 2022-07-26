import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import Input from "@mui/material/Input";

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
      <h1>My Account page</h1>
      <p>
        My Account informtaion is view-only. You cannot edit this informtaion.
      </p>
      <form>
        <div className="employee-info">
          <label>First Name: </label>
          <Input disabled defaultValue={employee.firstName}></Input>
          <label>Last Name: </label>
          <Input disabled defaultValue={employee.lastName}></Input>
          <label>Email: </label>
          <Input disabled defaultValue={employee.email}></Input>
          <label>Department: </label>
          <Input disabled defaultValue={employee.department}></Input>
          <label>Employee Number: </label>
          <Input disabled defaultValue={employee.employeeNumber}></Input>
          <label>Job Title: </label>
          <Input disabled defaultValue={employee.jobTitle}></Input>
        </div>
        <button onClick={onLogout}>Logout</button>
      </form>
    </>
  );
};

export default MyAccount;
