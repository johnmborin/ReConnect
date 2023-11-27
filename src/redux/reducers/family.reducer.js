const familyReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_FAMILY":
      return action.payload;
    case "UNSET_FAMILY":
      return [];
    default:
      return state;
  }
};

export default familyReducer;
