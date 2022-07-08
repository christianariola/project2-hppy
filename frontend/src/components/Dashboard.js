import { useSelector } from "react-redux";
// import DailyCompleted from "./DailyCompleted";
import DailySurvey from "./DailySurvey";
// import { useState } from "react";

const Dashboard = () => {
  // bring in employee state from redux store
  const { employee } = useSelector((state) => state.auth);
  // bring in dailySurvey state from redux store
  // const { dailySurvey } = useSelector((state) => state.dailySurvey);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome, {employee.firstName}</p>
      <p>Role: {employee.role}</p>
      <div className="survey-Container">
        <DailySurvey />
        {/* {dailySurvey === "pending" ? <DailySurvey /> : <DailyCompleted />} */}
      </div>
    </>
  );
};

export default Dashboard;
