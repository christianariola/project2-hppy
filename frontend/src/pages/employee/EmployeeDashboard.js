import DailySurvey from '../../components/DailySurvey'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { dailySurveyChecker } from "../../features/survey/surveySlice"

const EmployeeDashboard = () => {

  const { employee } = useSelector(state => state.auth)

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const together = [currentYear, currentMonth, currentDay].join("");

  const [surveyId, setSurveyId] = useState(employee.email + together);
  const [surveyChecker, setSurveyChecker] = useState(false);

  const dispatch = useDispatch()

  const { doneDaily, message } = useSelector(state => state.survey)

  useEffect(() => {
    const employeeData = {
      surveyid: surveyId
    }

    dispatch(dailySurveyChecker(employeeData))
  }, [surveyChecker, surveyId, doneDaily, dispatch])


  return <>
    {(doneDaily) ? "No daily survey available. Thank you!" : <DailySurvey />}
  </>
}

export default EmployeeDashboard
