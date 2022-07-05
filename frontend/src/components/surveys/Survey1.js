import { useSelector } from "react-redux";
import { useState } from 'react';
import axios from "axios";
// import { get } from "http";
// import { getTimeMeasureUtils } from "@reduxjs/toolkit/dist/utils";


const Survey1 = () => {
 // bring in employee state from redux store
    const { employee } = useSelector((state) => state.auth);

    const [weeklySurveyDate, setWeeklySurveyDate] = useState();
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');


      const dateHandler = () => {
          const fullDate = new Date().getTime()

    setWeeklySurveyDate(fullDate);
  };

    const handleFormSubmit = (e) => {
    e.preventDefault();
    const weeklySurvey = {
        employeeEmail: employee.email,
            answer1,
            answer2,
            answer3,
            answer4,
    };
    const surveyid = employee.email + weeklySurveyDate;
        console.log(surveyid);
        console.log(weeklySurvey);

    //axios post to /weeklysurvey endpoint
    axios
      .post("/weeklysurveys", { weeklySurvey, surveyid: surveyid })

      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response.data.message === "Weekly survey already Exists") {
          alert(`Weekly survey already submitted by User: ${employee.email}`);
        } else {
          console.log(err);
        }
      });
  };

    return (
        <div className="survey" >
            <form action="/weeklysurveys"
                method="POST"
                onSubmit={handleFormSubmit}
                onChange={dateHandler}
            >
                Survey1 component
                <h2>Survey questions</h2>
                <div className="survey-question">
                    <label htmlFor="answer1">Q1: Lorem ipsum dolor sit amet, consectetur ? 
                        <div className="answer">
                            <label>
                                <input type="radio" name="answer1" value="Congue praesent ac odio"
                                onChange={(e) => setAnswer1(e.target.value)}/>Congue praesent ac odio
                            </label>
                            <label>
                                <input type="radio" name=" answer1" value="Congue praesent ac turo"
                                onChange={(e) => setAnswer1(e.target.value)}
                                />Congue praesent ac turo
                            </label>
                            <label>
                                <input type="radio" name="answer1" value="Congue  ac odio grnds"
                                onChange={(e) => setAnswer1(e.target.value)} />Congue  ac odio grnds
                            </label>
                        </div> 
                    </label>
                </div>
                <div className="survey-question">
                    <label htmlFor="answer2">Q2: Consequat at maecenas vulputate mattis ?</label>
                    <div className="answer">
                        <textarea type="text" name="answer2" id="answer2"
                        onChange={(e) => setAnswer2(e.target.value)}/>
                    </div>
                </div>
                <div className="survey-question">
                    <label htmlFor="answer3">Q3: Feugiat sed sit integer id ullamcorper?</label>
                    <div className="answer">
                        <label>
                            <input type="radio" name="answer3" id="answer3" value="Bibendum vivamus ut lacinia auctor"
                            onChange={(e) => setAnswer3(e.target.value)}/>Bibendum vivamus ut lacinia auctor
                        </label>
                       <label>
                            <input type="radio" name="answer3" id="answer3" value="Congue bibendum vivamu ac turo"
                                onChange={(e) => setAnswer3(e.target.value)} />Congue bibendum vivamu ac turo
                        </label>
                        <label>
                            <input type="radio" name="answer3" id="answer3" value="Ac odio bibendum"
                                onChange={(e) => setAnswer3(e.target.value)} />Ac odio bibendum
                        </label>
                    </div>
                </div>
                <div className="survey-question">
                    <label htmlFor="answer4">Q4: Feugiat sed sit integer id ullamcorper?</label>
                    <div className="answer">
                        <select name="answer4" onChange={(e) => setAnswer4(e.target.value)}>    
                            <option
                                value="Bibendum vivamus ut lacinia auctor"
                            >Bibendum vivamus ut lacinia auctor</option>
                            <option
                                value="Bibendum vivamus ut lacinia head"
                            >Bibendum vivamus ut lacinia head</option>
                            <option
                                value="Bibendum vivamus ut lacinia employer"
                            >Bibendum vivamus ut lacinia employer</option>
                            <option
                                value="Bibendum vivamus ut lacinia footer"
                            >Bibendum vivamus ut lacinia footer</option>
                        </select>
                    </div>
                </div>
                <button >Submit</button>
            </form>

        </div>
    );

}

export default Survey1;