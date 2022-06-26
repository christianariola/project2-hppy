import axios from 'axios'

// Local API_URL for dev
//const API_URL = '/api/dailySurvey'
const API_URL = "https://pluto-hppy.herokuapp.com/api/dailySurvey";

const addSurvey = async (surveyData) => {
  const response = await axios.post(API_URL, surveyData);

  if (response.data) {
    localStorage.setItem("survey", JSON.stringify(response.data));
  }

  return response.data;
};

const surveyService = {
  addSurvey,
};

export default surveyService;