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

function* eventSaga() {
  yield takeLatest("FETCH_EVENT", fetchEvent);
}

export default eventSaga;
