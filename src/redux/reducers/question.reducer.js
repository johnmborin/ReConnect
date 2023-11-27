const questionReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_QUESTION":
      return action.payload;
    case "UNSET_QUESTIONS":
      return [];
    default:
      return state;
  }
};

export default questionReducer;
