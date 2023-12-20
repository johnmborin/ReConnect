import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import survey from "./survey.reducer";
import family from "./family.reducer";
import event from "./event.reducer";
import resource from "./resource.reducer";
import question from "./question.reducer";
import response from "./response.reducer";
import prompt from "./prompt.reducer";
import journal from "./journal.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  survey,
  family,
  event,
  resource,
  question,
  response,
  prompt,
  journal,
});

export default rootReducer;
