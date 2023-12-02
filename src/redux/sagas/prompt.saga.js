import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchPrompt() {
  try {
    const response = yield axios.get(`/api/prompt/`);
    yield put({ type: "SET_PROMPT", payload: response.data });
  } catch (error) {
    console.log("Prompt get request failed", error);
  }
}

function* postPrompt(action) {
  try {
    yield axios.post("/api/prompt", action.payload);
    yield put({ type: "FETCH_PROMPT" });
  } catch (error) {
    console.log("Prompt post request failed", error);
  }
}

function* updatePrompt(action) {
  try {
    yield axios.put(`/api/prompt/all/${action.payload.id}`, action.payload);
    yield put({ type: "FETCH_PROMPT" });
  } catch (error) {
    console.log("Prompt update request failed", error);
  }
}

function* updatePromptVisibility(action) {
  try {
    yield axios.put(
      `/api/prompt/visibility/${action.payload.id}`,
      action.payload
    );
    yield put({ type: "FETCH_PROMPT" });
  } catch (error) {
    console.log("Prompt update request failed", error);
  }
}

function* promptSaga() {
  yield takeLatest("FETCH_PROMPT", fetchPrompt);
  yield takeLatest("POST_PROMPT", postPrompt);
  yield takeLatest("UPDATE_PROMPT", updatePrompt);
  yield takeLatest("UPDATE_PROMPT_VISIBILITY", updatePromptVisibility);
}

export default promptSaga;
