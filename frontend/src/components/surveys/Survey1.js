import { useSelector } from "react-redux";
import { useState } from 'react';
import axios from "axios";
// import { get } from "http";
// import { getTimeMeasureUtils } from "@reduxjs/toolkit/dist/utils";


const Survey1 = () => {
 // bring in employee state from redux store
    const { employee } = useSelector((state) => state.auth);

    let q1 = "Q1: Lorem ipsum dolor sit amet, consectetur ?";
    let q2 = "Q2: Consequat at maecenas vulputate mattis ?";
    let q3 = "Q3: Lorem ipsum dolor sit amet.?";
    let q4 = "Q4: Feugiat sed sit integer id ullamcorper?";


    const [weeklySurveyDate, setWeeklySurveyDate] = useState();
    const [surveyType, setSurveyType] = useState('weeklySurvey');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [question1, setQuestion1] = useState(q1);
    const [question2, setQuestion2] = useState(q2);
    const [question3, setQuestion3] = useState(q3);
    const [question4, setQuestion4] = useState(q4);

    
    
    const questionHandler = () => {

    }


// Used this source as example how to do it: https://stackoverflow.com/questions/43744312/react-js-get-current-date    
    const dateHandler = () => {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        // console.log(`${year}${month<10?`0${month}`:`${month}`}${date}`) 
        setWeeklySurveyDate(`${year}${month<10?`0${month}`:`${month}`}${date}`);


  };

    const handleFormSubmit = (e) => {
        e.preventDefault();
    const weeklySurvey = {
 
        answers: {
            answer1,
            answer2,
            answer3,
            answer4
        },
        questions: {
            question1,
            question2,
            question3,
            question4
        },

    };
    const surveyid = employee.email + new Date().getTime();
        // console.log(surveyid);
        // console.log(weeklySurvey);
        // console.log("createdDate:", weeklySurveyDate);
        // console.log("surveyType:", surveyType);
        console.log(new Date().getTime())
        console.log({ weeklySurvey: weeklySurvey, surveyid: surveyid, surveyType: surveyType, createdDate: weeklySurveyDate,        employeeEmail: employee.email })

    //axios post to /weeklysurvey endpoint
    axios
      .post("/weeklysurveys", { weeklySurvey: weeklySurvey, surveyid: surveyid, surveyType: surveyType, createdDate: weeklySurveyDate,        employeeEmail: employee.email })

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
            <form action="https://pluto-hppy.herokuapp.com/weeklysurveys"
                method="POST"
                onSubmit={handleFormSubmit}
                onChange={dateHandler}
            >
                Survey1 component
                <h2>Survey questions</h2>
                <div className="survey-question">
                    <label htmlFor="answer1">{q1}
                        <div className="answer">
                            <label>
                                <input type="radio" name="answer1" value="Congue praesent ac odio"
                                onChange={(e) => setAnswer1(e.target.value)}/>Congue praesent ac odio
                            </label>
                            <label>
                                <input type="radio" name="answer1" value="Congue praesent ac turo"
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
                    <label htmlFor="answer2">{q2}</label>
                    <div className="answer">
                        <textarea type="text" name="answer2" id="answer2"
                        onChange={(e) => setAnswer2(e.target.value)}/>
                    </div>
                </div>
                <div className="survey-question">
                    <label htmlFor="answer3">{q3}</label>
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
                    <label htmlFor="answer4">{q4}</label>
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