import { combineReducers } from 'redux';

const surveyList = (state = [], action) => {
    switch(action.type) {
        case 'SET_SURVEY':
            return action.payload;
        default:
            return state;
    }
};

const surveyReply = (state = [], action) => {
    switch (action.type) {
        case 'SET_REPLY':
            return action.payload;
        default:
            return state;
    }
};

  
export default combineReducers({
    surveyList,
    surveyReply,
});