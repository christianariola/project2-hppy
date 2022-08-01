import { useSelector } from "react-redux";
import * as tf from "@tensorflow/tfjs";
import { useState, useEffect } from "react";
import axios from "axios";
import padSequences from "../components/helper/paddedSeq";
import CompletedLogo from "./helper/Completedlogo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom"

// import { addDailySurvey } from "../features/dailysurvey/surveySlice";

const DailySurvey = () => {
  // bring in employee state from redux store
  const { employee } = useSelector((state) => state.auth);

  //Survey States
  const [dailyFeeling, setDailyFeeling] = useState(3);
  const [dailyComment, setDailyComment] = useState("");
  const [dailySentiment, setDailySentiment] = useState();
  const [dailySurveyState, setDailySurveyState] = useState("pending");
  const [dailySurveyDate, setDailySurveyDate] = useState();
  const [surveyName, setSurveyName] = useState("");
  const [dailyTotalRating, setDailyTotalRating] = useState(3);
  const [doneSurvey, setdoneSurvey] = useState(false);

  ///Survey Date
  const dateHandler = () => {
    const date = new Date();
    const currentYear = new Date().getFullYear();
    const currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    const currentDay = String(date.getDate()).padStart(2, "0");
    const together = [currentYear, currentMonth, currentDay].join("-");
    setDailySurveyDate(together);
    setSurveyName("DailySurvey" + together);
  };

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
   * If the sentiment score is less than 0.6, the daily sentiment is negative, and the daily total
   * rating is the daily feeling minus 1.
   * If the sentiment score is greater than 0.6 and the daily feeling is less than 5, the daily
   * sentiment is positive, and the daily total rating is the daily feeling plus 1.
   * If the sentiment score is greater than 0.6 and the daily feeling is greater than 5, the daily
   * sentiment is neutral, and the daily total rating is the daily feeling.
   * @param sentimentScore - number
   */
  const sentimentAnalysis = (sentimentScore) => {
    if (sentimentScore < 0.7) {
      setDailySentiment("negative");
      setDailyTotalRating(Number(dailyFeeling) - 1);
    } else if (sentimentScore > 0.8 && dailyFeeling < 5) {
      setDailySentiment("positive");
      setDailyTotalRating(Number(dailyFeeling) + 1);
    } else {
      setDailySentiment("neutral");
      setDailyTotalRating(Number(dailyFeeling));
    }
  };

  /**
   * The function takes a string, trims it, converts it to lowercase, removes punctuation, splits it
   * into an array of words, and then maps each word to a number.
   * @param {string} text
   */
  const getSentimentScore = (text) => {
    const inputText = text
      .trim()
      .toLowerCase()
      .replace(/(\.|,|!)/g, "")
      .split(" ");
    setTrim(inputText);
    const sequence = inputText.map((word) => {
      let wordIndex = metadata.word_index[word] + metadata.index_from;
      if (wordIndex > metadata.vocabulary_size) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });
    setSeq(sequence);

    // Perform truncation and padding.
    /* Padding the sequence to the max length of the sequence. */
    const paddedSequence = padSequences([sequence], metadata.max_len);
    setPad(paddedSequence);

    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
    setInput(input);

    /* The code is using the model to predict the sentiment of the input text. */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      dailyTotalRating,
    };
    const surveyid = employee.email + dailySurveyDate;

    //axios post to /dailySurvey endpoint
    axios
      .post("https://pluto-hppy.herokuapp.com/dailySurvey", {
        dailySurvey,
        surveyid: surveyid,
        surveyType: "Daily",
      })

      .then((res) => {
        toast.success("Survey Submitted Successfully");
        setdoneSurvey(true);
      })
      .catch((err) => {
        if (err.response.data.message === "Survey Already Exists") {
          toast.error("Daily Survey has already been submitted");
          setdoneSurvey(true);
          // alert(`Daily Survey already submitted by User: ${employee.email}`);
        } else {
          console.log(err);
        }
      });
  };

  if (doneSurvey) {
    return <CompletedLogo />;
  } else {
    return (
      <>
        <div className="dailywrapper">
          <h2>How was your Shift?</h2>
          {/* <p>Welcome, {employee.firstName}</p> */}
          <form
            className="survey-form"
            onSubmit={handleFormSubmit}
            onChange={dateHandler}
          >
            <div className="survey-rating-row">
              <div className="icon">
                <label>
                  {/* <p>Very Unsatisfactory</p> */}
                  <svg
                    className="survey-rating-icon-veryunsat"
                    width="140"
                    height="140"
                    viewBox="0 0 140 139.877"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M41.853 96.781C41.853 96.781 70.388 59.122 98.923 96.781C98.923 96.781 70.388 75.632 41.853 96.781Z"
                      fill="#603813"
                    />
                    <path
                      d="M69.989 139.479C108.599 139.479 139.899 108.256 139.899 69.74C139.899 31.223 108.599 0 69.989 0C31.378 0 0.078 31.223 0.078 69.74C0.078 108.256 31.378 139.479 69.989 139.479Z"
                      fill="#FFDD66"
                    />
                    <path
                      d="M79.405 45.544C79.405 45.544 95.299 57.756 110.508 45.544C110.508 45.544 104.174 60.545 94.957 60.545C94.957 60.545 87.338 62.253 79.405 45.544Z"
                      fill="#754C24"
                    />
                    <path
                      d="M30.896 45.544C30.896 45.544 46.79 57.756 61.999 45.544C61.999 45.544 55.664 60.545 46.448 60.545C46.448 60.545 38.829 62.253 30.896 45.544Z"
                      fill="#754C24"
                    />
                    <path
                      d="M82.259 40.677C82.259 40.677 86.91 27.611 104.031 30.458"
                      stroke="#8B6239"
                      strokeMiterlimit="10"
                      strokeWidth="0.12323943661971831"
                    />
                    <path
                      d="M58.318 40.677C58.318 40.677 53.667 27.611 36.546 30.458"
                      stroke="#8B6239"
                      strokeMiterlimit="10"
                      strokeWidth="0.12323943661971831"
                    />
                    <path
                      d="M41.853 85.424C41.853 85.424 70.388 47.765 98.923 85.424C98.923 85.424 70.388 64.274 41.853 85.424Z"
                      fill="#603813"
                    />
                    <path
                      d="M78.064 68.914C78.064 68.914 80.832 100.055 89.393 108.595C89.393 108.595 72.272 105.748 75.125 122.827C75.125 122.827 77.979 134.584 89.393 130.114C89.393 130.114 96.612 143.521 108.682 138.853C108.682 138.853 123.634 134.184 120.781 119.952C120.781 119.952 131.595 117.789 130.625 107.826C130.283 104.296 128.542 100.937 125.66 98.859C122.094 96.269 116.044 94.903 108.197 104.296C108.197 104.296 86.739 91.857 78.064 68.886V68.914Z"
                      fill="#CBCBCB"
                    />
                    <path
                      d="M77.836 63.705C77.836 63.705 80.604 94.846 89.164 103.385C89.164 103.385 72.043 100.539 74.897 117.618C74.897 117.618 77.75 129.374 89.164 124.906C89.164 124.906 96.384 138.312 108.454 133.643C108.454 133.643 123.406 128.975 120.553 114.743C120.553 114.743 131.367 112.58 130.397 102.617C130.055 99.087 128.314 95.728 125.432 93.65C121.865 91.06 115.816 89.694 107.969 99.087C107.969 99.087 86.511 86.648 77.836 63.676V63.705Z"
                      fill="white"
                    />
                    <path
                      d="M61.914 68.914C61.914 68.914 59.146 100.055 50.585 108.595C50.585 108.595 67.706 105.748 64.853 122.827C64.853 122.827 61.999 134.584 50.585 130.114C50.585 130.114 43.366 143.521 31.296 138.853C31.296 138.853 16.343 134.184 19.197 119.952C19.197 119.952 8.382 117.789 9.352 107.826C9.695 104.296 11.435 100.937 14.317 98.859C17.884 96.269 23.934 94.903 31.781 104.296C31.781 104.296 53.239 91.857 61.914 68.886V68.914Z"
                      fill="#CBCBCB"
                    />
                    <path
                      d="M62.142 63.705C62.142 63.705 59.374 94.846 50.813 103.385C50.813 103.385 67.934 100.539 65.081 117.618C65.081 117.618 62.227 129.374 50.813 124.906C50.813 124.906 43.594 138.312 31.524 133.643C31.524 133.643 16.572 128.975 19.425 114.743C19.425 114.743 8.61 112.58 9.581 102.617C9.923 99.087 11.664 95.728 14.546 93.65C18.113 91.06 24.162 89.694 32.009 99.087C32.009 99.087 53.467 86.648 62.142 63.676V63.705Z"
                      fill="white"
                    />
                  </svg>
                  <input
                    type="radio"
                    name="questionOne"
                    value="1"
                    onClick={(e) => setDailyFeeling(e.target.value)}
                    onMouseDown={() => dateHandler()}
                  />
                </label>
              </div>
              <div className="icon">
                <label>
                  {/* <p>Unsatisfactory</p> */}
                  <svg
                    className="survey-rating-icon-unsat"
                    width="140"
                    height="140"
                    viewBox="0 0 140 139.877"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M70 139.821C108.61 139.821 139.91 108.521 139.91 69.91C139.91 31.3 108.61 0 70 0C31.39 0 0.09 31.3 0.09 69.91C0.09 108.521 31.39 139.821 70 139.821Z"
                      fill="#FFDD66"
                    />
                    <path
                      d="M45.745 74.191C52.049 74.191 57.159 69.08 57.159 62.777C57.159 56.473 52.049 51.363 45.745 51.363C39.442 51.363 34.331 56.473 34.331 62.777C34.331 69.08 39.442 74.191 45.745 74.191Z"
                      fill="#603813"
                    />
                    <path
                      d="M97.108 74.191C103.412 74.191 108.522 69.08 108.522 62.777C108.522 56.473 103.412 51.363 97.108 51.363C90.804 51.363 85.694 56.473 85.694 62.777C85.694 69.08 90.804 74.191 97.108 74.191Z"
                      fill="#603813"
                    />
                    <path
                      d="M42.892 105.579C42.892 105.579 71.427 67.827 99.962 105.579C99.962 105.579 71.427 84.378 42.892 105.579Z"
                      fill="#603813"
                    />
                  </svg>
                  <input
                    type="radio"
                    name="questionOne"
                    value="2"
                    onClick={(e) => setDailyFeeling(e.target.value)}
                  />
                </label>
              </div>
              <div className="icon">
                <label>
                  {/* <p>Nuetral</p> */}
                  <svg
                    className="survey-rating-icon-nuetral"
                    width="140"
                    height="140"
                    viewBox="0 0 140 140"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M70.011 139.91C108.622 139.91 139.921 108.611 139.921 70C139.921 31.39 108.622 0.09 70.011 0.09C31.401 0.09 0.101 31.39 0.101 70C0.101 108.611 31.401 139.91 70.011 139.91Z"
                      fill="#FFDD66"
                    />
                    <path
                      d="M45.757 74.28C52.06 74.28 57.171 69.17 57.171 62.866C57.171 56.563 52.06 51.452 45.757 51.452C39.453 51.452 34.343 56.563 34.343 62.866C34.343 69.17 39.453 74.28 45.757 74.28Z"
                      fill="#603813"
                    />
                    <path
                      d="M97.119 74.28C103.423 74.28 108.533 69.17 108.533 62.866C108.533 56.563 103.423 51.452 97.119 51.452C90.816 51.452 85.705 56.563 85.705 62.866C85.705 69.17 90.816 74.28 97.119 74.28Z"
                      fill="#603813"
                    />
                  </svg>
                  <input
                    type="radio"
                    name="questionOne"
                    value="3"
                    onClick={(e) => setDailyFeeling(e.target.value)}
                  />
                </label>
              </div>
              <div className="icon">
                <label>
                  {/* <p>Satisfactory</p> */}
                  <svg
                    className="survey-rating-icon-sat"
                    width="140"
                    height="140"
                    viewBox="0 0 140 139.877"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M70.022 139.877c38.611 0 69.91-31.3 69.91-69.911 0-38.61-31.299-69.91-69.91-69.91-38.61 0-69.91 31.3-69.91 69.91 0 38.611 31.3 69.911 69.91 69.911Z"
                      fill="#FD6"
                    />
                    <path
                      d="M45.768 74.247c6.303 0 11.414-5.111 11.414-11.414 0-6.304-5.111-11.414-11.414-11.414-6.304 0-11.414 5.11-11.414 11.414 0 6.303 5.11 11.414 11.414 11.414Zm51.363 0c6.303 0 11.413-5.111 11.413-11.414 0-6.304-5.11-11.414-11.413-11.414-6.304 0-11.414 5.11-11.414 11.414 0 6.303 5.11 11.414 11.414 11.414ZM42.914 91.71s28.535 37.752 57.07 0c0 0-28.535 21.201-57.07 0Z"
                      fill="#603813"
                    />
                  </svg>
                  <input
                    type="radio"
                    name="questionOne"
                    value="4"
                    onClick={(e) => setDailyFeeling(e.target.value)}
                  />
                </label>
              </div>
              <div className="icon">
                <label>
                  {/* <p>Very Satisfactory</p> */}
                  <svg
                    className="survey-rating-icon-verysat"
                    width="140"
                    height="140"
                    viewBox="0 0 140 140"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M69.972 140c38.644 0 69.972-31.328 69.972-69.972 0-38.644-31.328-69.972-69.972-69.972C31.328.056 0 31.384 0 70.028 0 108.672 31.328 140 69.972 140Z"
                      fill="#FD6"
                    />
                    <path
                      d="M79.397 60.86s15.908-12.252 31.13 0c0 0-6.34-15.051-15.565-15.051 0 0-7.626-1.713-15.565 15.051Zm-48.552 0s15.908-12.252 31.13 0c0 0-6.34-15.051-15.565-15.051 0 0-7.626-1.713-15.565 15.051Z"
                      fill="#754C24"
                    />
                    <path
                      d="M41.412 91.791s28.56 37.785 57.12 0c0 0-28.56 21.22-57.12 0Z"
                      fill="#603813"
                    />
                    <path
                      d="M112.526 88.592c7.098 0 12.852-5.754 12.852-12.852 0-7.098-5.754-12.852-12.852-12.852-7.098 0-12.852 5.754-12.852 12.852 0 7.098 5.754 12.852 12.852 12.852Zm-85.68 0c7.098 0 12.852-5.754 12.852-12.852 0-7.098-5.754-12.852-12.852-12.852-7.098 0-12.852 5.754-12.852 12.852 0 7.098 5.754 12.852 12.852 12.852Z"
                      fill="#F69C7C"
                    />
                  </svg>
                  <input
                    type="radio"
                    name="questionOne"
                    value="5"
                    onClick={(e) => setDailyFeeling(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="survey-comment">
              <label htmlFor="questionTwo">
                Write anything about your shift today.
              </label>
              <textarea
                name="questionTwo"
                id="questionTwo"
                cols="70"
                rows="10"
                value={sentimentText}
                onChange={(e) => {
                  setSentimentText(e.target.value);
                  getSentimentScore(sentimentText);
                  sentimentAnalysis(sentimentScore);
                }}
              ></textarea>
            </div>
            <input
              className="survey-submitBtn"
              type="submit"
              value="Submit"
              onClick={() => {
                setDailySurveyState("submitted");
                setDailyComment(sentimentText);
                getSentimentScore(sentimentText);
                sentimentAnalysis(sentimentScore);
              }}
            />
          </form>
        </div>
      </>
    );
  }
};
export default DailySurvey;
