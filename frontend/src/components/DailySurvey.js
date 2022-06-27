import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
// import { addDailySurvey } from "../features/dailysurvey/surveySlice";

const DailySurvey = () => {
  // bring in employee state from redux store
  const { employee } = useSelector((state) => state.auth);

  const [isActive, setIsActive] = useState(false);

  const [dailyFeeling, setDailyFeeling] = useState(3);
  const [dailyComment, setDailyComment] = useState("");
  const [dailySentiment, setDailySentiment] = useState();
  const [dailySurveyState, setDailySurveyState] = useState("pending");
  const [dailySurveyDate, setDailySurveyDate] = useState();
  const [surveyName, setSurveyName] = useState("");

  ///Survey Date
  const dateHandler = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    const together = [currentYear, currentMonth, currentDay].join("");
    setDailySurveyDate(together);
    setSurveyName("DailySurvey" + together);
  };

  //Sentiment Analysis Block
  const sentimentAnalysis = (dailyComment) => {
    setDailySentiment("positive");
  };
  // const dispatch = useDispatch();
  //Handle changing of classname on se
  const handleClassname = (e) => {
    console.log(e);
    setIsActive(!isActive);
  };

  //Form Submit function
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const dailySurvey = {
      employeeEmail: employee.email,
      surveyName,
      dailyFeeling,
      dailyComment,
      dailySentiment,
      dailySurveyState,
      dailySurveyDate,
    };
    const surveyid = employee.email + dailySurveyDate;

    //axios post to /dailySurvey endpoint
    axios
      .post("/dailySurvey", { dailySurvey, surveyid: surveyid })

      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response.data.message === "Survey Already Exists") {
          alert(`Daily Survey already submitted by User: ${employee.email}`);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <>
      <h2>How was your Shift?</h2>
      <p>Welcome, {employee.firstName}</p>
      <form
        className="survey-form"
        onSubmit={handleFormSubmit}
        onChange={dateHandler}
      >
        <div className="survey-rating-row">
          <label
            className={isActive ? "Selected" : ""}
            onMouseDown={() => handleClassname(1)}
          >
            {/* <p>Very Unsatisfactory</p> */}
            <svg
              className="survey-rating-icon-veryunsat"
              width="140"
              height="140"
              viewBox="0 0 62 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M62 32C62 48.6 48.6 62 32 62C15.4 62 2 48.6 2 32C2 15.4 15.4 2 32 2C48.6 2 62 15.4 62 32Z"
                fill="#FFDD67"
              />
              <path
                d="M48.4 12.9002C44.2 13.3002 40.3 15.5002 37.9 19.0002C37.6 19.5002 35.7 18.3002 36.1 17.7002C38.9 13.7002 43.3 11.1002 48.2 10.7002C48.9 10.7002 49 12.9002 48.4 12.9002ZM26.1 19.0002C23.7 15.5002 19.8 13.3002 15.6 12.9002C15 12.9002 15.1 10.7002 15.8 10.7002C20.7 11.1002 25.1 13.7002 27.9 17.7002C28.3 18.3002 26.4 19.5002 26.1 19.0002Z"
                fill="#917524"
              />
              <path
                d="M21.2 39.9C28.2 35.1 35.9 35.1 42.8 39.9C43.6 40.5 44.4 39.5 43.8 38.6C41.7 35.2 37.4 32.1 32 32.1C26.6 32.1 22.3 35.2 20.2 38.6C19.6 39.5 20.4 40.5 21.2 39.9ZM35.9 21C40.1 29 48.6 29 52.8 21C53 20.6 52.5 20.4 51.8 20C47.6 23.3 40.7 23 36.9 20C36.3 20.5 35.7 20.6 35.9 21ZM11.2 21C15.4 29 23.9 29 28.1 21C28.3 20.6 27.8 20.4 27.1 20C22.9 23.3 16 23 12.2 20C11.5 20.5 11 20.6 11.2 21Z"
                fill="#664E27"
              />
              <path
                d="M61.7001 47.2998C60.7001 44.7998 57.4001 43.4998 54.4001 44.2998C52.8001 44.6998 51.6001 45.5998 51.0001 46.6998C43.2001 45.1998 36.0001 31.2998 36.0001 31.2998C36.0001 31.2998 36.2001 42.5998 41.9001 49.1998C40.7001 48.7998 39.4001 48.7998 38.0001 49.0998C34.9001 49.8998 33.3001 52.5998 34.3001 54.9998C35.3001 57.3998 38.6001 58.7998 41.6001 57.9998C41.8001 57.8998 42.0001 57.8998 42.2001 57.7998C43.8001 60.8998 48.1001 62.4998 52.2001 61.4998C56.5001 60.3998 58.8001 56.6998 57.4001 53.2998C57.6001 53.2998 57.8001 53.1998 58.0001 53.1998C61.0001 52.4998 62.7001 49.7998 61.7001 47.2998ZM2.30007 47.2998C3.30007 44.7998 6.60007 43.4998 9.60007 44.2998C11.2001 44.6998 12.4001 45.5998 13.0001 46.6998C20.8001 45.1998 28.0001 31.2998 28.0001 31.2998C28.0001 31.2998 27.8001 42.5998 22.1001 49.1998C23.3001 48.7998 24.6001 48.7998 26.0001 49.0998C29.1001 49.8998 30.7001 52.5998 29.7001 54.9998C28.7001 57.4998 25.4001 58.7998 22.4001 57.9998C22.2001 57.8998 22.0001 57.8998 21.8001 57.7998C20.2001 60.8998 15.9001 62.4998 11.8001 61.4998C7.50007 60.3998 5.20007 56.6998 6.60007 53.2998C6.40007 53.2998 6.20007 53.1998 6.00007 53.1998C3.00007 52.4998 1.30007 49.7998 2.30007 47.2998Z"
                fill="#D8D8D8"
              />
              <path
                d="M59.2999 44.7998C58.3999 42.1998 55.3999 40.6998 52.4999 41.5998C51.0999 41.9998 49.9999 42.9998 49.2999 44.1998C42.0999 42.5998 35.4999 27.7998 35.4999 27.7998C35.4999 27.7998 35.7999 39.8998 40.9999 46.9998C39.8999 46.5998 38.6999 46.5998 37.4999 46.8998C34.6999 47.7998 33.1999 50.5998 34.0999 53.1998C34.9999 55.7998 37.9999 57.2998 40.8999 56.3998C41.0999 56.2998 41.2999 56.2998 41.4999 56.1998C42.9999 59.4998 46.9999 61.2998 50.6999 60.0998C54.5999 58.8998 56.7999 54.9998 55.4999 51.2998C55.6999 51.2998 55.8999 51.1998 56.0999 51.1998C58.6999 50.2998 60.2999 47.4998 59.2999 44.7998ZM4.69992 44.7998C5.59992 42.1998 8.59992 40.6998 11.4999 41.5998C12.8999 41.9998 13.9999 42.9998 14.5999 44.1998C21.7999 42.5998 28.3999 27.7998 28.3999 27.7998C28.3999 27.7998 28.1999 39.8998 22.9999 46.9998C24.0999 46.5998 25.2999 46.5998 26.4999 46.8998C29.2999 47.7998 30.8999 50.5998 29.8999 53.1998C28.9999 55.7998 25.9999 57.2998 23.0999 56.3998C22.8999 56.2998 22.6999 56.2998 22.4999 56.1998C20.9999 59.4998 16.9999 61.2998 13.2999 60.0998C9.49992 58.9998 7.39992 54.9998 8.69992 51.2998C8.49992 51.2998 8.29992 51.1998 8.09992 51.1998C5.29992 50.2998 3.69992 47.4998 4.69992 44.7998Z"
                fill="white"
              />
            </svg>
            <input
              type="radio"
              name="questionOne"
              value="1"
              onClick={(e) => setDailyFeeling(e.target.value)}
              style={{ display: "none" }}
              onMouseDown={() => dateHandler()}
            />
          </label>
          <label>
            {/* <p>Unsatisfactory</p> */}
            <svg
              className="survey-rating-icon-unsat"
              width="140"
              height="140"
              viewBox="0 0 62 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62Z"
                fill="#FFDD67"
              />
              <path
                d="M20.5 29.6001C23.2614 29.6001 25.5 27.3615 25.5 24.6001C25.5 21.8387 23.2614 19.6001 20.5 19.6001C17.7386 19.6001 15.5 21.8387 15.5 24.6001C15.5 27.3615 17.7386 29.6001 20.5 29.6001Z"
                fill="#664E27"
              />
              <path
                d="M43.5 29.6001C46.2614 29.6001 48.5 27.3615 48.5 24.6001C48.5 21.8387 46.2614 19.6001 43.5 19.6001C40.7386 19.6001 38.5 21.8387 38.5 24.6001C38.5 27.3615 40.7386 29.6001 43.5 29.6001Z"
                fill="#664E27"
              />
              <path
                d="M19.4001 45.8C27.5001 40.1 36.5001 40.2 44.6001 45.8C45.6001 46.5 46.4001 45.3 45.8001 44.2C43.3001 40.2 38.4001 36.5 32.0001 36.5C25.6001 36.5 20.7001 40.1 18.2001 44.2C17.6001 45.3 18.4001 46.5 19.4001 45.8"
                fill="#664E27"
              />
            </svg>
            <input
              type="radio"
              name="questionOne"
              value="2"
              onClick={(e) => setDailyFeeling(e.target.value)}
              style={{ display: "none" }}
            />
          </label>
          <label>
            {/* <p>Nuetral</p> */}
            <svg
              className="survey-rating-icon-nuetral"
              width="140"
              height="140"
              viewBox="0 0 62 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62Z"
                fill="#FFDD67"
              />
              <path
                d="M20.5 33.5C23.2614 33.5 25.5 31.2614 25.5 28.5C25.5 25.7386 23.2614 23.5 20.5 23.5C17.7386 23.5 15.5 25.7386 15.5 28.5C15.5 31.2614 17.7386 33.5 20.5 33.5Z"
                fill="#664E27"
              />
              <path
                d="M43.5 33.5C46.2614 33.5 48.5 31.2614 48.5 28.5C48.5 25.7386 46.2614 23.5 43.5 23.5C40.7386 23.5 38.5 25.7386 38.5 28.5C38.5 31.2614 40.7386 33.5 43.5 33.5Z"
                fill="#664E27"
              />
            </svg>
            <input
              type="radio"
              name="questionOne"
              value="3"
              onClick={(e) => setDailyFeeling(e.target.value)}
              style={{ display: "none" }}
            />
          </label>
          <label>
            {/* <p>Satisfactory</p> */}
            <svg
              className="survey-rating-icon-sat"
              width="140"
              height="140"
              viewBox="0 0 62 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62Z"
                fill="#FFDD67"
              />
              <path
                d="M20.5 31.6001C23.2614 31.6001 25.5 29.3615 25.5 26.6001C25.5 23.8387 23.2614 21.6001 20.5 21.6001C17.7386 21.6001 15.5 23.8387 15.5 26.6001C15.5 29.3615 17.7386 31.6001 20.5 31.6001Z"
                fill="#664E27"
              />
              <path
                d="M43.5 31.6001C46.2614 31.6001 48.5 29.3615 48.5 26.6001C48.5 23.8387 46.2614 21.6001 43.5 21.6001C40.7386 21.6001 38.5 23.8387 38.5 26.6001C38.5 29.3615 40.7386 31.6001 43.5 31.6001Z"
                fill="#664E27"
              />
              <path
                d="M44.6001 40.3C36.5001 46 27.5001 45.9 19.4001 40.3C18.4001 39.6 17.6001 40.8 18.2001 41.9C20.7001 45.9 25.6001 49.6 32.0001 49.6C38.4001 49.6 43.3001 46 45.8001 41.9C46.4001 40.8 45.6001 39.6 44.6001 40.3Z"
                fill="#664E27"
              />
            </svg>
            <input
              type="radio"
              name="questionOne"
              value="4"
              onClick={(e) => setDailyFeeling(e.target.value)}
              style={{ display: "none" }}
            />
          </label>
          <label>
            {/* <p>Very Satisfactory</p> */}
            <svg
              className="survey-rating-icon-verysat"
              width="140"
              height="140"
              viewBox="0 0 62 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62Z"
                fill="#FFDD67"
              />
              <path
                opacity="0.8"
                d="M50.8 44C55.2183 44 58.8 40.4183 58.8 36C58.8 31.5817 55.2183 28 50.8 28C46.3818 28 42.8 31.5817 42.8 36C42.8 40.4183 46.3818 44 50.8 44Z"
                fill="#FF717F"
              />
              <path
                opacity="0.8"
                d="M13.2 44C17.6182 44 21.2 40.4183 21.2 36C21.2 31.5817 17.6182 28 13.2 28C8.78167 28 5.19995 31.5817 5.19995 36C5.19995 40.4183 8.78167 44 13.2 44Z"
                fill="#FF717F"
              />
              <path
                d="M44.6 40.3002C36.5 46.0002 27.5 45.9002 19.4 40.3002C18.4 39.6002 17.6 40.8002 18.2 41.9002C20.7 45.9002 25.6 49.6002 32 49.6002C38.4 49.6002 43.3 46.0002 45.8 41.9002C46.4 40.8002 45.6 39.6002 44.6 40.3002ZM28.5 26.9002C26.6 21.8002 23.8 19.2002 21 19.2002C18.2 19.2002 15.4 21.8002 13.5 26.9002C13.3 27.4002 14.3 28.3002 14.8 27.8002C16.6 25.9002 18.8 25.1002 21 25.1002C23.2 25.1002 25.4 25.9002 27.2 27.8002C27.8 28.3002 28.7 27.4002 28.5 26.9002ZM50.4 26.9002C48.5 21.8002 45.7 19.2002 42.9 19.2002C40.1 19.2002 37.3 21.8002 35.4 26.9002C35.2 27.4002 36.2 28.3002 36.7 27.8002C38.5 25.9002 40.7 25.1002 42.9 25.1002C45.1 25.1002 47.3 25.9002 49.1 27.8002C49.6 28.3002 50.6 27.4002 50.4 26.9002Z"
                fill="#664E27"
              />
            </svg>
            <input
              type="radio"
              name="questionOne"
              value="5"
              onClick={(e) => setDailyFeeling(e.target.value)}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div className="survey-comment">
          <label htmlFor="questionTwo">
            What did you like most about your shift?
          </label>
          <textarea
            name="questionTwo"
            id="questionTwo"
            cols="30"
            rows="20"
            value={dailyComment}
            onChange={(e) => setDailyComment(e.target.value)}
          ></textarea>
        </div>

        <input
          type="submit"
          value="Submit"
          onClick={() => {
            setDailySurveyState("submitted");
            sentimentAnalysis(dailyComment);
          }}
        />
      </form>
      <p>Rating:{dailyFeeling}</p>
      <br></br>
      <p>Comment:{dailyComment}</p>
    </>
  );
};

export default DailySurvey;
