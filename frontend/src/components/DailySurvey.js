import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const DailySurvey = () => {
  // bring in employee state from redux store
  const { employee } = useSelector((state) => state.auth);
  const [dailyFeeling, setDailyFeeling] = useState(3);
  const [dailyComment, setDailyComment] = useState("");
  const [dailySentiment, setDailySentiment] = useState();
  const [dailySurveyState, setDailySurveyState] = useState("pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("dailyFeeling", dailyFeeling);
    console.log("dailyComment", dailyComment);
    setDailySurveyState("submitted");
  };

  return (
    <>
      <h2>How was your Shift?</h2>
      <p>Welcome, {employee.firstName}</p>
      <form className="survey-form" onSubmit={handleSubmit()}>
        <fieldset>
          <h2>How was your shift?</h2>
          <input
            type="radio"
            name="questionOne"
            value="1"
            onClick={() => setDailyFeeling(1)}
          />
          <input
            type="radio"
            name="questionOne"
            value="2"
            onClick={() => setDailyFeeling(2)}
          />
          <input
            type="radio"
            name="questionOne"
            value="3"
            onClick={() => setDailyFeeling(3)}
          />
          <input
            type="radio"
            name="questionOne"
            value="4"
            onClick={() => setDailyFeeling(4)}
          />
          <input
            type="radio"
            name="questionOne"
            value="5"
            onClick={() => setDailyFeeling(5)}
          />
        </fieldset>
        <label htmlFor="questionTwo">
          What did you like most about your shift?
          <input
            id="questionTwo"
            name="questionTwo"
            type="text"
            value={dailyComment}
            onChange={(e) => setDailyComment(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default DailySurvey;
