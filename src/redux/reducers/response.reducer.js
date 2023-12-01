const responseReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RESPONSE":
      return action.payload;
    case "UNSET_RESPONSE":
      return [];
    default:
      return state;
  }
};

export default responseReducer;
