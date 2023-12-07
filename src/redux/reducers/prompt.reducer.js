const promptReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PROMPT":
      return action.payload;
    case "UNSET_PROMPT":
      return [];
    default:
      return state;
  }
};

export default promptReducer;
