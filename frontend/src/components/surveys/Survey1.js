import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import padSequences from "../helper/paddedSeq";
import * as tf from "@tensorflow/tfjs";
// import { get } from "http";
// import { getTimeMeasureUtils } from "@reduxjs/toolkit/dist/utils";

const Survey1 = () => {
  // bring in employee state from redux store
  const { employee } = useSelector((state) => state.auth);

  let q1 = "Q1: Lorem ipsum dolor sit amet, consectetur ?";
  let q2 = "Q2: Consequat at maecenas vulputate mattis ?";
  let q3 = "Q3: Lorem ipsum dolor sit amet.?";
  let q4 = "Q4: Feugiat sed sit integer id ullamcorper?";

  const [monthlySurveyDate, setMonthlySurveyDate] = useState();
  const [surveyType, setSurveyType] = useState("monthlySurvey");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [question1, setQuestion1] = useState(q1);
  const [question2, setQuestion2] = useState(q2);
  const [question3, setQuestion3] = useState(q3);
  const [question4, setQuestion4] = useState(q4);

  //Sentiment Analysis Block
  const [monthlyFeeling, setMonthlyFeeling] = useState(3); //This should be an average of the all survey questions
  const [monthlySentiment, setMonthlySentiment] = useState();
  const [monthlyTotalRating, setMonthlyTotalRating] = useState(3);

  ///States for Sentiment Analysis
  const [metadata, setMetadata] = useState();
  const [model, setModel] = useState();
  const [sentimentText, setSentimentText] = useState("");
  const [sentimentScore, setSentimentScore] = useState();

  const [, setTrim] = useState("");
  const [, setSeq] = useState("");
  const [, setPad] = useState("");
  const [, setInput] = useState("");

  //Sentiment Analysis model and metadata URL

  const url = {
    model:
      "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json",
    metadata:
      "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json",
  };

  const OOV_INDEX = 2;

  //Async function to load model and metadata
  /**
   * The loadModel function loads the model from the URL and the loadMetadata function loads the
   * metadata from the URL.
   * @param url - {
   */
  async function loadModel(url) {
    try {
      const model = await tf.loadLayersModel(url.model);
      setModel(model);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadMetadata(url) {
    try {
      const metadataJson = await fetch(url.metadata);
      const metadata = await metadataJson.json();
      setMetadata(metadata);
    } catch (err) {
      console.log(err);
    }
  }

  //Sentiment Analysis Block
  /**
   * If the sentiment score is less than 0.6, the monthly sentiment is negative, and the monthly total
   * rating is the monthly feeling minus 1.
   * If the sentiment score is greater than 0.6 and the monthly feeling is less than 5, the monthly
   * sentiment is positive, and the monthly total rating is the monthly feeling plus 1.
   * If the sentiment score is greater than 0.6 and the monthly feeling is greater than 5, the monthly
   * sentiment is neutral, and the monthly total rating is the monthly feeling.
   * @param sentimentScore - number
   */
  const sentimentAnalysis = (sentimentScore) => {
    if (sentimentScore < 0.6) {
      setMonthlySentiment("negative");
      setMonthlyTotalRating(Number(monthlyFeeling) - 1);
    } else if (sentimentScore > 0.6 && monthlyFeeling < 5) {
      setMonthlySentiment("positive");
      setMonthlyTotalRating(Number(monthlyFeeling) + 1);
    } else {
      setMonthlySentiment("neutral");
      setMonthlyTotalRating(Number(monthlyFeeling));
    }
  };

  /**
   * The function takes a string, trims it, converts it to lowercase, removes punctuation, splits it
   * into an array of words, and then maps each word to a number.
   * @param {string} text
   */
  const getSentimentScore = (text) => {
    console.log(text);
    const inputText = text
      .trim()
      .toLowerCase()
      .replace(/(\.|,|!)/g, "")
      .split(" ");
    setTrim(inputText);
    console.log(inputText);
    const sequence = inputText.map((word) => {
      let wordIndex = metadata.word_index[word] + metadata.index_from;
      if (wordIndex > metadata.vocabulary_size) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });
    setSeq(sequence);
    console.log(sequence);

    // Perform truncation and padding.
    const paddedSequence = padSequences([sequence], metadata.max_len);
    console.log(metadata.max_len);
    setPad(paddedSequence);

    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
    console.log(input);
    setInput(input);
    const predictOut = model.predict(input);
    const score = predictOut.dataSync()[0];
    predictOut.dispose();
    setSentimentScore(score);
    return score;
  };

  useEffect(() => {
    tf.ready().then(() => {
      loadModel(url);
      loadMetadata(url);
    });
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  const questionHandler = () => {};

  // Used this source as example how to do it: https://stackoverflow.com/questions/43744312/react-js-get-current-date
  const dateHandler = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    // console.log(`${year}${month<10?`0${month}`:`${month}`}${date}`)
    setMonthlySurveyDate(
      `${year}${month < 10 ? `0${month}` : `${month}`}${date}`
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const monthlySurvey = {
      answers: {
        answer1,
        answer2,
        answer3,
        answer4,
      },
      questions: {
        question1,
        question2,
        question3,
        question4,
      },
    };
    const surveyid = employee.email + new Date().getTime();
    // console.log(surveyid);
    // console.log(monthlySurvey);
    // console.log("createdDate:", monthlySurveyDate);
    // console.log("surveyType:", surveyType);
    console.log(new Date().getTime());
    console.log({
      monthlySurvey: monthlySurvey,
      surveyid: surveyid,
      surveyType: surveyType,
      createdDate: monthlySurveyDate,
      employeeEmail: employee.email,
      monthlyFeeling,
      monthlySentiment,
      monthlyTotalRating,
    });

    //axios post to /monthlySurvey endpoint
    axios
      .post("/monthlySurveys", {
        monthlySurvey: monthlySurvey,
        surveyid: surveyid,
        surveyType: surveyType,
        createdDate: monthlySurveyDate,
        employeeEmail: employee.email,
        monthlyFeeling,
        monthlySentiment,
        monthlyTotalRating,
      })

      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response.data.message === "Monthly survey already Exists") {
          alert(`Monthly survey already submitted by User: ${employee.email}`);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="survey">
      <form
        action="https://pluto-hppy.herokuapp.com/monthlySurveys"
        method="POST"
        onSubmit={handleFormSubmit}
        onChange={dateHandler}
      >
        Survey1 component
        <h2>Survey questions</h2>
        <div className="survey-question">
          <label htmlFor="answer1">
            {q1}
            <div className="answer">
              <label>
                <input
                  type="radio"
                  name="answer1"
                  value="Congue praesent ac odio"
                  onChange={(e) => setAnswer1(e.target.value)}
                />
                Congue praesent ac odio
              </label>
              <label>
                <input
                  type="radio"
                  name="answer1"
                  value="Congue praesent ac turo"
                  onChange={(e) => setAnswer1(e.target.value)}
                />
                Congue praesent ac turo
              </label>
              <label>
                <input
                  type="radio"
                  name="answer1"
                  value="Congue  ac odio grnds"
                  onChange={(e) => setAnswer1(e.target.value)}
                />
                Congue ac odio grnds
              </label>
            </div>
          </label>
        </div>
        <div className="survey-question">
          <label htmlFor="answer2">{q2}</label>
          <div className="answer">
            <textarea
              type="text"
              name="answer2"
              id="answer2"
              value={sentimentText}
              onChange={(e) => {
                setAnswer2(e.target.value);
                setSentimentText(e.target.value); //set sentimentText to the value of the textarea
                getSentimentScore(sentimentText); //passing the text to the getSentimentScore function and gets a score on a scale of 0-1
                sentimentAnalysis(sentimentScore); //passing the score to the sentimentAnalysis function and add or reduce score from overall survey score based on Sentiment score.
              }}
            />
          </div>
        </div>
        <div className="survey-question">
          <label htmlFor="answer3">{q3}</label>
          <div className="answer">
            <label>
              <input
                type="radio"
                name="answer3"
                id="answer3"
                value="Bibendum vivamus ut lacinia auctor"
                onChange={(e) => setAnswer3(e.target.value)}
              />
              Bibendum vivamus ut lacinia auctor
            </label>
            <label>
              <input
                type="radio"
                name="answer3"
                id="answer3"
                value="Congue bibendum vivamu ac turo"
                onChange={(e) => setAnswer3(e.target.value)}
              />
              Congue bibendum vivamu ac turo
            </label>
            <label>
              <input
                type="radio"
                name="answer3"
                id="answer3"
                value="Ac odio bibendum"
                onChange={(e) => setAnswer3(e.target.value)}
              />
              Ac odio bibendum
            </label>
          </div>
        </div>
        <div className="survey-question">
          <label htmlFor="answer4">{q4}</label>
          <div className="answer">
            <select name="answer4" onChange={(e) => setAnswer4(e.target.value)}>
              <option value="Bibendum vivamus ut lacinia auctor">
                Bibendum vivamus ut lacinia auctor
              </option>
              <option value="Bibendum vivamus ut lacinia head">
                Bibendum vivamus ut lacinia head
              </option>
              <option value="Bibendum vivamus ut lacinia employer">
                Bibendum vivamus ut lacinia employer
              </option>
              <option value="Bibendum vivamus ut lacinia footer">
                Bibendum vivamus ut lacinia footer
              </option>
            </select>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Survey1;
