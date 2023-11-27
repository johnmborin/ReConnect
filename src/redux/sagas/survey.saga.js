
import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

//GET
function* getSurveyList() {
    try {
        const assetsResponse = yield axios.get('/api/survey');
        yield put({ type: 'SET_SURVEY', payload: assetsResponse.data});
    } catch (error) {
        console.log('ERROR in getSurveyList', error);
        alert('Something went wrong!');
    }
};

//POST


//PUT


//DELETE



function* surveySaga() {
    yield takeLatest('FETCH_SURVEY', getSurveyList);
}

export default surveySaga;