import axios from 'axios'

// Local API_URL for dev
const API_URL = '/api/survey'
// const API_URL = "https://pluto-hppy.herokuapp.com/api/survey";

const dailySurveyChecker = async (userData) => {
  const response = await axios.post(API_URL + '/dailychecker', userData)
  return response.data
}

const surveyService = {
  dailySurveyChecker
};

export default surveyService;