const journalReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_JOURNAL":
      return action.payload;
    case "UNSET_JOURNAL":
      return [];
    default:
      return state;
  }
};

export default journalReducer;
