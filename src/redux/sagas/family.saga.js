import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchFamily() {
  try {
    const response = yield axios.get("/api/family");
    yield put({ type: "SET_FAMILY", payload: response.data });
  } catch (error) {
    console.log("Error with user logout:", error);
  }
}

function* familySaga() {
  yield takeLatest("FETCH_FAMILY", fetchFamily);
}

export default familySaga;
