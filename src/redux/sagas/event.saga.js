import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchEvent() {
  try {
    const response = yield axios.get("/api/event");
    yield put({ type: "SET_EVENT", payload: response.data });
  } catch (error) {
    console.log("Error with user logout:", error);
  }
}

function* postEvent(action) {
  try {
    yield axios.post("/api/event", action.payload);
    yield put({ type: "FETCH_EVENT" });
  } catch (error) {
    console.log("Error with user logout:", error);
  }
}

function* eventSaga() {
  yield takeLatest("FETCH_EVENT", fetchEvent);
  yield takeLatest("POST_EVENT", postEvent);
}

export default eventSaga;
