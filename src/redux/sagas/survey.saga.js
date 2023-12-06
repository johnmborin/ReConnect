
import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

//GET
function* getSurveyList() {
    try {
        const surveyQuestion = yield axios.get('/api/survey');
        yield put({ type: 'SET_SURVEY', payload: surveyQuestion.data});
    } catch (error) {
        console.log('ERROR in getSurveyList', error);
       alert('Something went wrong!');
    }
};

//POST
function* addSurveyReply(action) {
    try {
        const surveyReply = yield axios.post('/api/survey', { 
            response: action.payload.response,
            user_id: action.payload.user_id,
            question_id: action.payload.question_id,
            score: action.payload.score,
            date: action.payload.date,
         });
        yield put({ type: 'SET_REPLY', payload: surveyReply.data });
    } catch (error) {
        console.log('ERROR in addSurveyReply', error);
        alert('Something went wrong!');
    }
}


//PUT


//DELETE



function* surveySaga() {
    yield takeLatest('FETCH_SURVEY', getSurveyList);
    yield takeLatest('FETCH_REPLY', addSurveyReply);
}

export default surveySaga;