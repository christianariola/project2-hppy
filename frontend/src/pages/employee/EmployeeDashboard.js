import DailySurvey from "../../components/DailySurvey";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dailySurveyChecker } from "../../features/survey/surveySlice";
import Completedlogo from "../../components/helper/Completedlogo";

const EmployeeDashboard = () => {
  const { employee } = useSelector((state) => state.auth);

  const date = new Date();
  const currentYear = new Date().getFullYear();
  const currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  const currentDay = String(date.getDate()).padStart(2, "0");
  const together = [currentYear, currentMonth, currentDay].join("-");

  const surveyId = employee.email + together;
  const surveyChecker = false;

  const dispatch = useDispatch();

  const { doneDaily } = useSelector((state) => state.survey);

  console.log(doneDaily)

  useEffect(() => {
    const employeeData = {
      surveyid: surveyId,
    };

    dispatch(dailySurveyChecker(employeeData));
  }, [surveyChecker, surveyId, doneDaily, dispatch]);

  return <>{doneDaily ? <Completedlogo /> : <DailySurvey />}</>;
};

export default EmployeeDashboard;
