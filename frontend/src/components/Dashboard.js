import { useSelector } from "react-redux";
import DailySurvey from "./DailySurvey";

const Dashboard = () => {
  // bring in employee state from redux store
  const { employee } = useSelector((state) => state.auth);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome, {employee.firstName}</p>
      <p>Role: {employee.role}</p>
      <div className="survey-Container">
        <DailySurvey />
      </div>
    </>
  );
};

export default Dashboard;
