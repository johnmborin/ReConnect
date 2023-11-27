import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchResponse() {
  try {
    const response = yield axios.get(`/api/response/`);
    yield put({ type: "SET_RESPONSE", payload: response.data });
  } catch (error) {
    console.log("Response get request failed", error);
  }
}

function* responseSaga() {
  yield takeLatest("FETCH_RESPONSE", fetchResponse);
}

export default responseSaga;
