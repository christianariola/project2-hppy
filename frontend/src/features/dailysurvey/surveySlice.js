import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import surveyService from "../dailysurvey/surveyService";

const initialDsurveyState = {
  surveyState: "Incomplete",
};

// Add new Daily Survey
export const addDailySurvey = createAsyncThunk(
  "dailysurvey/addDailySurvey",
  async (survey, thunkAPI) => {
    try {
      return await surveyService.addDailySurvey(survey);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const surveySlice = createSlice({
  name: "ds",
  initialState: initialDsurveyState,
  reducers: {
    increment: (state) => {
      state.surveyState = "Completed";
    },
  },
});

export const { increment } = surveySlice.actions;
export default surveySlice.reducer;
