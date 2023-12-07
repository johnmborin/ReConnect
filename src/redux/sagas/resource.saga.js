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

function* postResource(action) {
  try {
    yield axios.post(`/api/resource/`, action.payload);
    yield put({ type: "FETCH_RESOURCE" });
  } catch (error) {
    console.log("Resource post request failed", error);
  }
}

function* updateResource(action) {
  try {
    yield axios.put(`/api/resource/${action.payload.id}`, action.payload);
    yield put({ type: "FETCH_RESOURCE" });
  } catch (error) {
    console.log("Resource put request failed", error);
  }
}

function* deleteResource(action) {
  try {
    yield axios.delete(`/api/resource/${action.payload}`);
    yield put({ type: "FETCH_RESOURCE" });
  } catch (error) {
    console.log("Resource delete request failed", error);
  }
}

function* resourceSaga() {
  yield takeLatest("FETCH_RESOURCE", fetchResource);
  yield takeLatest("POST_RESOURCE", postResource);
  yield takeLatest("UPDATE_RESOURCE", updateResource);
  yield takeLatest("DELETE_RESOURCE", deleteResource);
}

export default resourceSaga;
