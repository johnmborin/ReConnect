import { combineReducers } from 'redux';

const likertList = (state = [], action) => {
    switch(action.type) {
        case 'SET_LIKERT':
            return action.payload;
        default:
            return state;
    }
};

const likertReply = (state = [], action) => {
    switch (action.type) {
        case 'SET_REPLY_LIKERT':
            return action.payload;
        default:
            return state;
    }
};

  
export default combineReducers({
    likertList,
    likertReply,
});