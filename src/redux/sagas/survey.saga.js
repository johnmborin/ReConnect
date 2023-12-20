import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getSurveyList() {
  try {
    const surveyQuestion = yield axios.get("/api/survey");
    yield put({ type: "SET_SURVEY", payload: surveyQuestion.data });
  } catch (error) {
    console.log("ERROR in getSurveyList", error);
    alert("Something went wrong!");
  }
}

function* postSurvey(action) {
  try {
    yield axios.post("/api/survey", action.payload);
    yield put({ type: "FETCH_SURVEY" });
  } catch (error) {
    console.log("ERROR in postSurvey", error);
    alert("Something went wrong!");
  }
}

function* surveySaga() {
  yield takeLatest("FETCH_SURVEY", getSurveyList);
  yield takeLatest("POST_SURVEY", postSurvey);
}

export default surveySaga;
