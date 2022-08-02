import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import padSequences from "../../components/helper/paddedSeq.js";
import * as tf from "@tensorflow/tfjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { get } from "http";
// import { getTimeMeasureUtils } from "@reduxjs/toolkit/dist/utils";

const Survey1 = ({
  choosenSurvey,
  setOpenSurvey,
  openSurvey,
  setChoosenSurvey,
}) => {
  // bring in employee state from redux store
  const { employee } = useSelector((state) => state.auth);
  // console.log(choosenSurvey)
  // let mongoID = choosenSurvey._id
  // console.log(mongoID);
  let q1 =
    "Q1: How satisfied or dissatisfied are you with your ability to do interesting work in your role?";
  let q2 =
    "Q2: How satisfied or dissatisfied are you with your ability to apply your skills in this role?";
  let q3 =
    "Q3: How satisfied or dissatisfied are you with your current workload?";
  let q4 =
    "Q4: How satisfied or dissatisfied are you with your opportunities for career progression?";
  let q5 =
    "Q5: How satisfied or dissatisfied are you with the physical environment at your workplace?";
  let q6 =
    "Q6: How satisfied or dissatisfied are you with your relationship with your manager?";
  let q7 =
    "Q7: Overall, how satisfied, or dissatisfied are you with your current employer?";
  let q7a = "Q7a: Please share any additional feedback you may have?";

  const [surveyStatus, setSurveyStatus] = useState("");
  const [surveyOpened, setSurveyOpened] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [answer5, setAnswer5] = useState("");
  const [answer6, setAnswer6] = useState("");
  const [answer7, setAnswer7] = useState("");
  const [answer7a, setAnswer7a] = useState("");
  // const [isReload, setIsReload] = useState(false);

  //Sentiment Analysis Block
  const [monthlyFeeling] = useState(3); //This should be an average of the all survey questions
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
    // console.log(text);
    const inputText = text
      .trim()
      .toLowerCase()
      .replace(/(\.|,|!)/g, "")
      .split(" ");
    setTrim(inputText);
    // console.log(inputText);
    const sequence = inputText.map((word) => {
      let wordIndex = metadata.word_index[word] + metadata.index_from;
      if (wordIndex > metadata.vocabulary_size) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });
    setSeq(sequence);
    // console.log(sequence);

    // Perform truncation and padding.
    const paddedSequence = padSequences([sequence], metadata.max_len);
    // console.log(metadata.max_len);
    setPad(paddedSequence);

    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
    // console.log(input);
    setInput(input);
    const predictOut = model.predict(input);
    const score = predictOut.dataSync()[0];
    predictOut.dispose();
    setSentimentScore(score);
    return score;
  };

  const justReload = () => {
    setInterval(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    tf.ready().then(() => {
      loadModel(url);
      loadMetadata(url);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setSurveyStatus("completed");
    setSurveyOpened(true);
  }, [answer1, openSurvey]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      answer1 === "" ||
      answer2 === "" ||
      answer3 === "" ||
      answer4 === "" ||
      answer5 === "" ||
      answer6 === "" ||
      answer7 === "" ||
      answer7a === ""
    ) {
      toast.warning("Please, answer all questions of the forms", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // alert("Please, answer all questions of the form")
    } else {
      // setSurveyType("monthlySurvey");
      setSurveyOpened(true);
      setOpenSurvey(false);
      // console.log(openSurvey);
      setSurveyStatus("completed");
      setChoosenSurvey("");
      justReload();
      const monthlySurvey = {
        answers: {
          answer1,
          answer2,
          answer3,
          answer4,
          answer5,
          answer6,
          answer7,
          answer7a,
        },
      };

      //axios post to /monthlySurvey endpoint
      axios
        .patch(
          // "https://pluto-hppy.herokuapp.com/monthlySurveys"
          "/monthlySurveys",
          {
            monthlySurvey: monthlySurvey,
            surveyid: choosenSurvey.surveyid,
            surveyType: choosenSurvey.surveyType,
            createdDate: choosenSurvey.createdDate,
            surveyStatus: surveyStatus,
            surveyOpened: surveyOpened,
            employeeEmail: employee.email,
            surveyName: choosenSurvey.surveyName,
            monthlyFeeling,
            monthlySentiment,
            monthlyTotalRating,
          }
        )

        .then((res) => {
          // console.log(res);
          setOpenSurvey(false);
          justReload(true);
        })
        .catch((err) => {
          if (err.response.data.message === "Monthly survey already Exists") {
            toast.error("Monthly survey already submitted", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // alert(`Monthly survey already submitted by User: ${employee.email}`);
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <div className="survey">
      <form
        id="monthForm"
        // action="/monthlySurveys"
        onSubmit={handleFormSubmit}
        // onChange={dateHandler}
      >
        <h3>Survey questions</h3>
        <div className="survey-question">
          <label htmlFor="answer1">
            <p>{q1}</p>
            <div className="answer">
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer1"
                  value="1"
                  // required
                  onChange={(e) => setAnswer1(e.target.value)}
                />
                <span className="ED"></span>
                <div>Extremely dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer1"
                  value="2"
                  onChange={(e) => setAnswer1(e.target.value)}
                />
                <span className="MD"></span>
                <div>Moderately dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer1"
                  value="3"
                  onChange={(e) => setAnswer1(e.target.value)}
                />
                <span className="SD"></span>
                <div>Slightly dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer1"
                  value="4"
                  onChange={(e) => setAnswer1(e.target.value)}
                />
                <span className="NSND"></span>
                <div>Neither satisfied nor dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer1"
                  value="5"
                  onChange={(e) => setAnswer1(e.target.value)}
                />
                <span className="SS"></span>
                <div>Slightly satisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer1"
                  value="6"
                  onChange={(e) => setAnswer1(e.target.value)}
                />
                <span className="MS"></span>
                <div>Moderately satisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer1"
                  value="7"
                  onChange={(e) => setAnswer1(e.target.value)}
                />
                <span className="ES"></span>
                <div>Extremely satisfied</div>
              </label>
            </div>
          </label>
        </div>
        <div className="survey-question">
          <label htmlFor="answer2">
            {q2}
            <div className="answer">
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer2"
                  value="1"
                  onChange={(e) => setAnswer2(e.target.value)}
                />
                <span className="ED"></span>
                <div>Extremely dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer2"
                  value="2"
                  onChange={(e) => setAnswer2(e.target.value)}
                />
                <span className="MD"></span>
                <div>Moderately dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer2"
                  value="3"
                  onChange={(e) => setAnswer2(e.target.value)}
                />
                <span className="SD"></span>
                <div>Slightly dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer2"
                  value="4"
                  onChange={(e) => setAnswer2(e.target.value)}
                />
                <span className="NSND"></span>
                <div>Neither satisfied nor dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer2"
                  value="5"
                  onChange={(e) => setAnswer2(e.target.value)}
                />
                <span className="SS"></span>
                <div>Slightly satisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer2"
                  value="6"
                  onChange={(e) => setAnswer2(e.target.value)}
                />
                <span className="MS"></span>
                <div>Moderately satisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer2"
                  value="7"
                  onChange={(e) => setAnswer2(e.target.value)}
                />
                <span className="ES"></span>
                <div>Extremely satisfied</div>
              </label>
            </div>
          </label>
        </div>
        <div className="survey-question">
          <label htmlFor="answer3">
            {q3}
            <div className="answer">
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer3"
                  value="1"
                  onChange={(e) => setAnswer3(e.target.value)}
                />
                <span className="ED"></span>
                <div>Extremely dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer3"
                  value="2"
                  onChange={(e) => setAnswer3(e.target.value)}
                />
                <span className="MD"></span>
                <div>Moderately dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer3"
                  value="3"
                  onChange={(e) => setAnswer3(e.target.value)}
                />
                <span className="SD"></span>
                <div>Slightly dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer3"
                  value="4"
                  onChange={(e) => setAnswer3(e.target.value)}
                />
                <span className="NSND"></span>
                <div>Neither satisfied nor dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer3"
                  value="5"
                  onChange={(e) => setAnswer3(e.target.value)}
                />
                <span className="SS"></span>
                <div>Slightly satisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer3"
                  value="6"
                  onChange={(e) => setAnswer3(e.target.value)}
                />
                <span className="MS"></span>
                <div>Moderately satisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer3"
                  value="7"
                  onChange={(e) => setAnswer3(e.target.value)}
                />
                <span className="ES"></span>
                <div>Extremely satisfied</div>
              </label>
            </div>
          </label>
        </div>
        <div className="survey-question">
          <label htmlFor="answer4">
            {q4}
            <div className="answer">
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer4"
                  value="1"
                  onChange={(e) => setAnswer4(e.target.value)}
                />
                <span className="ED"></span>
                <div>Extremely dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer4"
                  value="2"
                  onChange={(e) => setAnswer4(e.target.value)}
                />
                <span className="MD"></span>
                <div>Moderately dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer4"
                  value="3"
                  onChange={(e) => setAnswer4(e.target.value)}
                />
                <span className="SD"></span>
                <div>Slightly dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer4"
                  value="4"
                  onChange={(e) => setAnswer4(e.target.value)}
                />
                <span className="NSND"></span>
                <div>Neither satisfied nor dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer4"
                  value="5"
                  onChange={(e) => setAnswer4(e.target.value)}
                />
                <span className="SS"></span>
                <div>Slightly satisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer4"
                  value="6"
                  onChange={(e) => setAnswer4(e.target.value)}
                />
                <span className="MS"></span>
                <div>Moderately satisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer4"
                  value="7"
                  onChange={(e) => setAnswer4(e.target.value)}
                />
                <span className="ES"></span>
                <div>Extremely satisfied</div>
              </label>
            </div>
          </label>
        </div>
        <div className="survey-question">
          <label htmlFor="answer5">
            {q5}
            <div className="answer">
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer5"
                  value="1"
                  onChange={(e) => setAnswer5(e.target.value)}
                />
                <span className="ED"></span>
                <div>Extremely dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer5"
                  value="2"
                  onChange={(e) => setAnswer5(e.target.value)}
                />
                <span className="MD"></span>
                <div>Moderately dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer5"
                  value="3"
                  onChange={(e) => setAnswer5(e.target.value)}
                />
                <span className="SD"></span>
                <div>Slightly dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer5"
                  value="4"
                  onChange={(e) => setAnswer5(e.target.value)}
                />
                <span className="NSND"></span>
                <div>Neither satisfied nor dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer5"
                  value="5"
                  onChange={(e) => setAnswer5(e.target.value)}
                />
                <span className="SS"></span>
                <div>Slightly satisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer5"
                  value="6"
                  onChange={(e) => setAnswer5(e.target.value)}
                />
                <span className="MS"></span>
                <div>Moderately satisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer5"
                  value="7"
                  onChange={(e) => setAnswer5(e.target.value)}
                />
                <span className="ES"></span>
                <div>Extremely satisfied</div>
              </label>
            </div>
          </label>
        </div>
        <div className="survey-question">
          <label htmlFor="answer6">
            {q6}
            <div className="answer">
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer6"
                  value="1"
                  onChange={(e) => setAnswer6(e.target.value)}
                />
                <span className="ED"></span>
                <div>Extremely dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer6"
                  value="2"
                  onChange={(e) => setAnswer6(e.target.value)}
                />
                <span className="MD"></span>
                <div>Moderately dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer6"
                  value="3"
                  onChange={(e) => setAnswer6(e.target.value)}
                />
                <span className="SD"></span>
                <div>Slightly dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer6"
                  value="4"
                  onChange={(e) => setAnswer6(e.target.value)}
                />
                <span className="NSND"></span>
                <div>Neither satisfied nor dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer6"
                  value="5"
                  onChange={(e) => setAnswer6(e.target.value)}
                />
                <span className="SS"></span>
                <div>Slightly satisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer6"
                  value="6"
                  onChange={(e) => setAnswer6(e.target.value)}
                />
                <span className="MS"></span>
                <div>Moderately satisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer6"
                  value="7"
                  onChange={(e) => setAnswer6(e.target.value)}
                />
                <span className="ES"></span>
                <div>Extremely satisfied</div>
              </label>
            </div>
          </label>
        </div>
        <div className="survey-question">
          <label htmlFor="answer7">
            {q7}
            <div className="answer">
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer7"
                  value="1"
                  onChange={(e) => setAnswer7(e.target.value)}
                />
                <span className="ED"></span>
                <div>Extremely dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer7"
                  value="2"
                  onChange={(e) => setAnswer7(e.target.value)}
                />
                <span className="MD"></span>
                <div>Moderately dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer7"
                  value="3"
                  onChange={(e) => setAnswer7(e.target.value)}
                />
                <span className="SD"></span>
                <div>Slightly dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer7"
                  value="4"
                  onChange={(e) => setAnswer7(e.target.value)}
                />
                <span className="NSND"></span>
                <div>Neither satisfied nor dissatisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer7"
                  value="5"
                  onChange={(e) => setAnswer7(e.target.value)}
                />
                <span className="SS"></span>
                <div>Slightly satisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer7"
                  value="6"
                  onChange={(e) => setAnswer7(e.target.value)}
                />
                <span className="MS"></span>
                <div>Moderately satisfied</div>
              </label>
              <label className="squareIcon">
                <input
                  className="squareRadio"
                  type="radio"
                  name="answer7"
                  value="7"
                  onChange={(e) => setAnswer7(e.target.value)}
                />
                <span className="ES"></span>
                <div>Extremely satisfied</div>
              </label>
            </div>
          </label>
        </div>
        <div className="survey-question">
          <label htmlFor="answer7a">{q7a}</label>
          <div className="answer">
            <textarea
              type="text"
              name="answer7a"
              id="answer7a"
              value={sentimentText}
              onChange={(e) => {
                setAnswer7a(e.target.value);
                setSentimentText(e.target.value); //set sentimentText to the value of the textarea
                getSentimentScore(sentimentText); //passing the text to the getSentimentScore function and gets a score on a scale of 0-1
                sentimentAnalysis(sentimentScore); //passing the score to the sentimentAnalysis function and add or reduce score from overall survey score based on Sentiment score.
              }}
            />
          </div>
        </div>
        <div id="message"></div>
        <button className="submit_btn">Submit</button>
      </form>
    </div>
  );
};

export default Survey1;
