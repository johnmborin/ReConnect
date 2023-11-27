import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchQuestions() {
  try {
    const response = yield axios.get("/api/question");
    yield put({ type: "SET_QUESTION", payload: response.data });
  } catch (error) {
    console.log("Error with fetching questions:", error);
  }
}

function* postQuestion(action) {
  try {
    yield axios.post("/api/question", action.payload);
    yield put({ type: "FETCH_QUESTION" });
  } catch (error) {
    console.log("Error with adding question:", error);
  }
}

function* questionSaga() {
  yield takeLatest("FETCH_QUESTION", fetchQuestions);
  yield takeLatest("POST_QUESTION", postQuestion);
}

export default questionSaga;
