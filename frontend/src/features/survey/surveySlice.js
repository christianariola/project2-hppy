import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import surveyService from "../survey/surveyService";

const initialState = {
  doneDaily: true,
};

// Add new Daily Survey
export const dailySurveyChecker = createAsyncThunk(
  "survey/dailySurveyChecker",
  async (employee, thunkAPI) => {
    try {
      return await surveyService.dailySurveyChecker(employee);
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
  name: "survey",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(dailySurveyChecker.pending, (state) => {
    })
    .addCase(dailySurveyChecker.fulfilled, (state, action) => {
        // console.log(action.payload.checker)

        if(!action.payload.checker){
          state.doneDaily = false
        }

    })
    .addCase(dailySurveyChecker.rejected, (state, action) => {
        state.message = action.payload
    })
},
});

// export const {} = surveySlice.actions;
export default surveySlice.reducer;
