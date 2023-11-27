import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchResource() {
  try {
    const response = yield axios.get(`/api/resource/`);
    yield put({ type: "SET_RESOURCE", payload: response.data });
  } catch (error) {
    console.log("Resource get request failed", error);
  }
}

function* resourceSaga() {
  yield takeLatest("FETCH_RESOURCE", fetchResource);
}

export default resourceSaga;
